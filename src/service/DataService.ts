import type {User} from "../core/User.ts";
import {updateLocalStorage} from "./utils.ts";
import type {Pet} from "../core/Pet.ts";
import type {VeterinaryRecord} from "../core/VeterinaryRecord.ts";
import {DATA_SOURCE_ADDED_BY_USER_ID, DATA_SOURCE_ADDED_BY_USER_NAME, type DataSource} from "../core/DataSource.ts";
import {getMockRecords} from "../mock/mockAppData.ts";

/**
 * This class acts as a data retriever for the application.
 * This allows the data source to be swapped for a unified service, rather than where a call is needed in the app.
 * For example, the functions could be hooked up to an actual external API, rather than local utilities and mock data.
 * For the purposes of this exercise, it is hooked up to local mocked data, and data is stored in localStorage.
 */
export class DataService {
  static addPet({
    userId,
    pet
  }:{
    userId: string;
    pet: Pet
  }): User {
    const user = DataService.getUser(userId);
    user.pets.push(pet);
    return DataService.updateUser({userId, payload: user});
  };

  /**
   * Adds a data source.
   * Since data sources are sensitive, to ensure no overwrites, this function
   * will only modify a data source if it is pre-existing; otherwise it will
   * add it.
   * @param userId
   * @param dataSource
   */
  static addDataSource({
    userId,
    dataSource
  }: {
    userId: string;
    dataSource: DataSource;
  }): User {
    const user = DataService.getUser(userId);
    const oldDataSource = user.dataSources[dataSource.id] ?? {};
    user.dataSources[dataSource.id] = {...oldDataSource, ...dataSource};

    return DataService.updateUser({userId, payload: user});
  }

  static addRecordOnDataSourceOnUser(user: User, record: VeterinaryRecord) {
    user.dataSources[record.dataSourceId].records[record.id] = record;
  }

  static addRecordToPet({
    userId,
    petId,
    record,
  }:{
    userId: string;
    petId: string;
    record: VeterinaryRecord;
  }): User {
    const user = DataService.getUser(userId);
    const pet = DataService.getPetOnUser({user, petId});
    if (pet) {
      pet.records[record.id] = record;
    } else {
      console.warn(`Pet ${petId} not found for user ${userId}; cannot add record.`);
    }

    DataService.addRecordOnDataSourceOnUser(user, record);
    return DataService.updateUser({userId, payload: user});
  }

  static deleteDataSource({
    userId,
    dataSourceId
  }: {
    userId: string;
    dataSourceId: string;
  }): User {
    const user = DataService.getUser(userId);
    delete user.dataSources[dataSourceId];

    return DataService.updateUser({userId, payload: user});
  }

  static deletePet({
    userId,
    petId,
  }:{
    userId: string;
    petId: string;
  }): User {
    const user = DataService.getUser(userId);
    const filteredOut = user.pets.filter((pet) => pet.id !== petId);
    user.pets = filteredOut;

    return DataService.updateUser({userId, payload: user});
  };

  static deleteRecordOnDataSourceOnUser(user: User, record: VeterinaryRecord) {
    delete user.dataSources[record.dataSourceId].records[record.id];
  }

  static deleteRecordOnPet({
    userId,
    petId,
    recordId,
  }:{
    userId: string;
    petId: string;
    recordId: string;
  }): User {
    const user = DataService.getUser(userId);
    const pet = DataService.getPetOnUser({user, petId});
    if (pet) {
      const record = pet.records[recordId];
      DataService.deleteRecordOnDataSourceOnUser(user, record);
      delete pet.records[recordId];
    } else {
      console.warn(`Pet ${petId} not found for user ${userId}; cannot delete record.`);
    }

    return DataService.updateUser({userId, payload: user});
  }

  /**
   * Edits a data source.
   * This is a shell around addDataSource, since it already handles edits.
   * @param userId
   * @param dataSource
   */
  static editDataSource({
    userId,
    dataSource
  }: {
    userId: string;
    dataSource: DataSource;
  }): User {
    return DataService.addDataSource({userId, dataSource});
  }

  static editPet({
    userId,
    petId,
    petData
  }:{
    userId: string;
    petId: string;
    petData: Partial<Pet>;
  }): User {
    const user = DataService.getUser(userId);
    const petIndex = user.pets.findIndex((pet) => pet.id === petId);
    const oldPetData = user.pets[petIndex];
    const newPetData = {...oldPetData, ...petData};
    user.pets[petIndex] = newPetData;

    return DataService.updateUser({userId, payload: user});
  };

  static editRecordOnDataSourceOnUser(user: User, record: VeterinaryRecord) {
    const oldRecord = user.dataSources[record.dataSourceId].records[record.id];
    user.dataSources[record.dataSourceId].records[record.id] = {...oldRecord, ...record};
  }

  static editRecordOnPet({
    userId,
    petId,
    recordId,
    recordData,
  }:{
    userId: string;
    petId: string;
    recordId: string;
    recordData: VeterinaryRecord;
  }): User {
    const user = DataService.getUser(userId);
    const pet = DataService.getPetOnUser({user, petId});
    if (pet) {
      const oldRecordData = pet.records[recordId];
      if (!oldRecordData) {
        console.warn(`Record ${recordId} not found for pet ${petId} for user ${userId}; cannot edit record.`);
      }

      pet.records[recordId] = {...oldRecordData, ...recordData};
    } else {
      console.warn(`Pet ${petId} not found for user ${userId}; cannot edit record.`);
    }

    DataService.editRecordOnDataSourceOnUser(user, recordData);

    return DataService.updateUser({userId, payload: user});
  }

  static getPet({
    userId,
    petId,
  }:{
    userId: string;
    petId: string
  }): Pet | undefined {
    const user =  DataService.getUser(userId);
    return user.pets.find((pet) => pet.id === petId);
  }

  static getPets(userId: string): Pet[] {
    const data = DataService.getUser(userId);
    if (!data) {
      return [];
    }

    return data.pets;
  }

  static getPetOnUser({
    user,
    petId,
  }:{
    user: User;
    petId: string
  }): Pet {
    const petIndex = user.pets.findIndex((pet) => pet.id === petId);
    return user.pets[petIndex];
  }

  static getUserDataSources(userId: string): Record<string, DataSource> {
    return DataService.getUser(userId).dataSources;
  }

  /**
   * Helper function that gets a user.
   * If the user doesn't exist, it will create the user entry.
   * @param userId
   * @private
   */
  static getUser(userId: string): User {
    const dataRaw = localStorage.getItem(userId);
    let user = dataRaw ? JSON.parse(dataRaw) as User : undefined;

    if (!user) {
      DataService.updateUser({
        userId,
        payload: {
          id: userId,
          name: 'test',
          pets: [],
          dataSources: {
            [DATA_SOURCE_ADDED_BY_USER_ID]: {
              id: DATA_SOURCE_ADDED_BY_USER_ID,
              name: DATA_SOURCE_ADDED_BY_USER_NAME,
              records: {},
            }
          }
        }
      });
      user = JSON.parse(localStorage.getItem(userId)!) as User;
    }

    return user;
  }

  /**
   * Syncs the user's data sources with external data.
   * It will return the synced user.
   * @param userId
   */
  static syncRecords(userId: string): User {
    const user = DataService.getUser(userId);

    // TODO need a smarter merge; this will overwrite local data if the data source is the same.
    user.dataSources = {...user.dataSources, ...getMockRecords(user)};

    //Update pet records
    Object.values(user.dataSources).forEach((dataSource) => {
      const records = Object.values(dataSource.records);
      records.forEach((record) => {
        const pet = DataService.getPetOnUser({user, petId: record.petId});
        if (!pet) {
          console.warn(`No pet ${record.petId} from record ${record.id}; skipping record update.`);
          return;
        }
        const oldRecordData = pet.records[record.id] ?? {};
        pet.records[record.id] = {...oldRecordData, ...record};
      });
    });

    return DataService.updateUser({userId, payload: user});
  }

  /**
   * Updates user information.
   * Returns the updated user.
   * @param userId
   * @param payload
   */
  static updateUser({
    userId,
    payload = {}
  }:{
    userId: string;
    payload?: Partial<User>
  }): User {
    updateLocalStorage(userId, payload);
    return DataService.getUser(userId);
  }
}
