import {useState} from "react";
import {AddCard} from "../component/card/AddCard.tsx";
import {getCopy} from "../../service/CopyService.ts";
import {PetCard} from "../component/card/PetCard.tsx";
import type {Pet} from "../../core/Pet.ts";
import type {OnChangePageParameters, SyncState} from "../types.ts";
import {ModalContext} from "../component/modal/Modal.tsx";
import {DataService} from "../../service/DataService.ts";
import {Header, Text} from "../component/Text.tsx";
import {getUserDataSourcesArray, type User} from "../../core/User.ts";
import {AddPetModal} from "../component/modal/AddPetModal.tsx";
import {AddRecordModal} from "../component/modal/AddRecordModal.tsx";
import type {VeterinaryRecord} from "../../core/VeterinaryRecord.ts";
import {SyncRecordsButton} from "../component/button/SyncRecordsButton.tsx";

export function PetHome({
  userData,
  onChangePage
}:{
  userData: User;
  onChangePage: (args: OnChangePageParameters) => void;
}) {
  const [user, setUser] = useState<User>(userData);
  const [pets, setPets] = useState<Pet[]>(userData.pets ?? []);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);
  const [showEditPetModal, setShowEditPetModal] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet>();
  const [syncState, setSyncState] = useState<SyncState>('not_synced');

  /* Local Functions */
  const onAddPet = (pet: Pet) => {
    const updatedUser = showAddPetModal ?
      DataService.addPet({userId: user.id, pet}) :
      DataService.editPet({userId: user.id, petId: pet.id, petData: pet});
    setUser(updatedUser);
    setPets(updatedUser?.pets ?? []);
    onCloseModal();
  };

  const onAddRecord = (record: VeterinaryRecord) => {
    const updatedUser = DataService.addRecordToPet({
      userId: user.id,
      petId: record.petId,
      record,
    });
    setUser(updatedUser);
    setPets(updatedUser.pets);
    onCloseModal();
  };

  const onCloseModal = () => {
    setShowAddPetModal(false);
    setShowAddRecordModal(false);
    setShowEditPetModal(false);
    setSelectedPet(undefined);
  };

  const onTriggerAddPet = () => {
    setShowAddPetModal(true);
  };

  const onClickPetCard = (pet: Pet) => {
    onChangePage({page: 'records', payload: {shownPets: [pet.id]}});
  };

  const onClickAddRecord = (pet: Pet, e: MouseEvent) => {
    setSelectedPet(pet);
    setShowAddRecordModal(true);
    setSyncState('synced');
    e.stopPropagation();
  };

  const onClickEditPet = (pet: Pet, e: MouseEvent) => {
    setSelectedPet(pet);
    setShowEditPetModal(true);
    e.stopPropagation();
  };

  const onClickDeletePet = (pet: Pet, e: MouseEvent) => {
    const updatedUser = DataService.deletePet({userId: user.id, petId: pet.id});
    if (selectedPet?.id === pet.id) {
      setSelectedPet(undefined);
    }

    setPets(updatedUser.pets);

    e.stopPropagation();
  };

  const onSync = () => {
    setSyncState('syncing');
    const updatedUser  = DataService.syncRecords(user.id);
    console.log(updatedUser);
    setUser(updatedUser);
    setPets(updatedUser.pets);
    setSyncState('synced');
  };

  /* Local Compute */
  const hasPets = pets.length > 0;

  return (
    <div className={"page"}>
      <div className={"page-top"}>
        <Header type={'title'} text={getCopy('petHomeTitle')}/>
        <Text classes={['subtitle']} value={getCopy('petHomeSubtitle')}/>
        {hasPets ? <SyncRecordsButton classes={['page-top--sync']} onSync={onSync}/>: null}
      </div>
      <div className={"card-grid"}>
        {pets.map((pet: Pet) => {
          return (
            <PetCard
              key={pet.id}
              pet={pet}
              onClickCard={() => onClickPetCard(pet)}
              onClickEditPet={(e: MouseEvent) => onClickEditPet(pet, e)}
              onClickAddRecord={(e: MouseEvent) => onClickAddRecord(pet, e)}
              onClickDeletePet={(e: MouseEvent) => onClickDeletePet(pet, e)}
              syncState={syncState}
            />
          );
        })}
        <AddCard header={getCopy('addPetHeader')} onClick={onTriggerAddPet}/>
      </div>
      {(showAddPetModal || showEditPetModal) ?
        <ModalContext>
          <AddPetModal
            onSubmitPet={onAddPet}
            onClose={onCloseModal}
            editMode={showEditPetModal}
            editPet={selectedPet}
          />
        </ModalContext>
        :
        null
      }
      {showAddRecordModal && selectedPet ?
        <ModalContext>
          <AddRecordModal
            petId={selectedPet.id}
            dataSources={getUserDataSourcesArray(user)}
            onSubmitRecord={onAddRecord}
            onClose={onCloseModal}
          />
        </ModalContext>
        :
        null
      }
    </div>
  );
}
