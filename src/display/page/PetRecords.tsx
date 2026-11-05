import {Header, Text, TextWithIcon} from "../component/Text.tsx";
import {getPetRecordsAsArray, type Pet} from "../../core/Pet.ts";
import {getCopy} from "../../service/CopyService.ts";
import {getUserDataSourcesArray, type User} from "../../core/User.ts";
import {type ChangeEvent, useState} from "react";
import {Icon} from "../component/Icon.tsx";
import type {VeterinaryRecord} from "../../core/VeterinaryRecord.ts";
import {AddCard} from "../component/card/AddCard.tsx";
import {RecordCard} from "../component/card/RecordCard.tsx";
import {ModalContext} from "../component/modal/Modal.tsx";
import {AddRecordModal} from "../component/modal/AddRecordModal.tsx";
import {ViewRecordModal} from "../component/modal/ViewRecordModal.tsx";
import {DataService} from "../../service/DataService.ts";
import {SyncRecordsButton} from "../component/button/SyncRecordsButton.tsx";
import {getIconIdForPetType} from "../util.ts";
import {Box} from "../component/Box.tsx";
import type {SyncState} from "../types.ts";

export function PetBadge({
  pet,
  onClickBadge,
  selected,
}:{
  pet: Pet;
  onClickBadge: (pet: Pet) => void;
  selected: boolean;
}) {
  const classes = selected ? 'pet-badge--selected' : 'pet-badge';

  return (
    <Box classes={[classes]} onClick={onClickBadge}>
      <TextWithIcon
        text={pet.name}
        icon={<Icon iconId={getIconIdForPetType(pet.type)}/>}
        iconPosition={'left'}
      />
    </Box>
  );
}

export function PetRecords({
  userData,
  shownPets = [],
  searchTermData = '',
}:{
  userData: User;
  shownPets?: string[]; // If undefined, then show all records for all pets.
  searchTermData?: string;
}) {
  const [user, setUser] = useState<User>(userData);
  const [pets, setPets] = useState<Pet[]>(userData.pets);
  const [searchTerm, setSearchTerm] = useState<string>(searchTermData);
  const [petsToShow, setPetsToShow] = useState<string[]>(shownPets);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showEditRecordModal, setShowEditRecordModal] = useState(false);
  const [showViewRecordModal, setShowViewRecordModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<VeterinaryRecord>();
  const [syncState, setSyncState] = useState<SyncState>('not_synced');

  /* Local Functions */
  const onChangeSearchFilter = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onClickPetBadge = (pet: Pet) => {
    let newPetsToShow: string[];
    if (petsToShow.includes(pet.id)) {
      newPetsToShow = petsToShow.filter((petId) => petId !== pet.id);
    } else {
      newPetsToShow = [...petsToShow, pet.id];
    }

    setPetsToShow(newPetsToShow);
  };

  const onClickAddRecordCard = () => {
    setShowAddRecordModal(true);
  };

  const onClickRecordCard = (record: VeterinaryRecord) => {
    setSelectedRecord(record);
    setShowViewRecordModal(true);
  };

  const onClickEditRecord = (record: VeterinaryRecord, e: MouseEvent) => {
    e.stopPropagation();
    setSelectedRecord(record);
    setShowEditRecordModal(true);
    e.stopPropagation();
  };

  const onClickDeleteRecord = (record: VeterinaryRecord, e: MouseEvent) => {
    e.stopPropagation();
    const updatedUser = DataService.deleteRecordOnPet({
      userId: user.id,
      petId: record.petId,
      recordId: record.id,
    });

    setUser(updatedUser);
    setPets(updatedUser.pets);
    e.stopPropagation();
  };

  const onAddRecord = (record: VeterinaryRecord) => {
    let updatedUser: User | undefined;
    if (showEditRecordModal) {
      updatedUser = DataService.editRecordOnPet({
        userId: user.id,
        petId: record.petId,
        recordId: record.id,
        recordData: record
      });
    } else {
      updatedUser = DataService.addRecordToPet({
        userId: user.id,
        petId: record.petId,
        record: record
      });
    }
    setUser(updatedUser);
    setPets(updatedUser.pets);
    onCloseModal();
  };

  const onCloseModal = () => {
    setShowAddRecordModal(false);
    setShowEditRecordModal(false);
    setSelectedRecord(undefined);
  };

  const onSync = () => {
    setSyncState('syncing');
    const updatedUser  = DataService.syncRecords(user.id);
    setUser(updatedUser);
    setPets(updatedUser.pets);
    setSyncState('synced');
  };

  /* Local Compute */

  const filteredRecords: VeterinaryRecord[] = [];
  if (petsToShow.length === 0 && !searchTerm) {
    pets.forEach((pet) => {
      filteredRecords.push(...getPetRecordsAsArray(pet.records));
    });
  } else {
    pets.forEach((pet) => {
      const filteredPetRecords =
        getPetRecordsAsArray(pet.records)
        .filter((record) => {
          let termMatch = true;
          let petMatch = true;

          if (searchTerm) {
            termMatch = record.type.toLowerCase().includes(searchTerm.toLowerCase())
              || record.dataSourceName.toLowerCase().includes(searchTerm.toLowerCase());
          }

          if (petsToShow.length > 0) {
            petMatch = petsToShow.includes(record.petId);
          }

          return termMatch && petMatch;
        });
      filteredRecords.push(...filteredPetRecords);
    });
  }

  const hasPets = pets.length > 0;

  return (
    <div className={"page"}>
      <div className={"page-top"}>
        <Header type={'title'} text={getCopy('petRecordsTitle')}/>
        <Text classes={['subtitle']} value={getCopy('petRecordsSubtitle')}/>
        <div className={"record-filters"}>
          <Header type={'h3'} text={getCopy('filterHeader')}/>
          <Text classes={['subtitle']} value={getCopy('filterTip')}/>
          <div className={"record-filters--tools"}>
            <input
              className={'searchbar form--input'}
              type={'text'}
              value={searchTerm}
              onChange={onChangeSearchFilter}
              placeholder={getCopy('searchbarPlaceholder')}
            />
            <div className={'badge-row'}>
              {pets.map((pet) => {
                const isSelected = petsToShow.includes(pet.id);
                return (
                  <PetBadge
                    key={pet.id}
                    pet={pet}
                    onClickBadge={() => onClickPetBadge(pet)}
                    selected={isSelected}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {hasPets ? <SyncRecordsButton classes={['page-top--sync']} onSync={onSync}/>: null}
      </div>
      <div className={"card-grid"}>
        {filteredRecords.map((record) => {
          const petName = pets.find((p) => p.id == record.petId)?.name ?? 'Error';
          return (
            <RecordCard
              key={record.id}
              petName={petName}
              record={record}
              onClickCard={() => onClickRecordCard(record)}
              onClickEditRecord={(e: MouseEvent) => onClickEditRecord(record, e)}
              onClickDeleteRecord={(e: MouseEvent) => onClickDeleteRecord(record, e)}
              syncState={syncState}
            />
          );
        })}
        <AddCard
          header={getCopy('addRecordHeader')}
          subheader={getCopy("addRecordSubheader")}
          onClick={onClickAddRecordCard}
        />
      </div>
      {showAddRecordModal || (showEditRecordModal && selectedRecord) ?
        <ModalContext>
          <AddRecordModal
            petId={selectedRecord?.petId}
            allPets={pets}
            dataSources={getUserDataSourcesArray(user)}
            onSubmitRecord={onAddRecord}
            onClose={onCloseModal}
            editMode={showEditRecordModal}
            editRecord={selectedRecord}
          />
        </ModalContext>
        :
        null
      }
      {showViewRecordModal && selectedRecord ?
        <ModalContext>
          <ViewRecordModal
            record={selectedRecord}
            onClose={onCloseModal}
          />
        </ModalContext>
        :
        null
      }
    </div>
  );
}
