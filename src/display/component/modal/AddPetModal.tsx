import {type Pet, PET_TYPES, type PetType, toPet} from "../../core/Pet.ts";
import {type ChangeEvent, useState} from "react";
import {Header} from "./Text.tsx";
import {getCopy} from "../../service/CopyService.ts";
import {Label} from "./Label.tsx";
import {Button} from "./Button.tsx";
import {Modal} from "./Modal.tsx";

export function AddPetModal({
  onSubmitPet,
  onClose,
}:{
  onSubmitPet: (pet: Pet) => void;
  onClose: () => void;
}) {
  const [petName, setPetName] = useState<string>('');
  const [petType, setPetType] = useState<PetType>('dog');

  const onChangePetName = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    setPetName(e.target.value.trim());
  };

  const onChangePetType = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setPetType(e.target.value as PetType);
  };

  const onSubmitPetLocal = () => {
    const pet = toPet({name: petName, type: petType});
    onSubmitPet(pet);
  };

  return (
    <Modal onClose={onClose}>
      <Header type={'h1'} text={getCopy('modalAddPetHeader')}/>
      <Label text={getCopy('modalAddPetNameLabel')} position={'top'}>
        <input className={'form--input'} value={petName} type={'text'} onChange={onChangePetName}/>
      </Label>
      <Label text={getCopy('modalAddPetTypeLabel')} position={'top'}>
        <select className={'form--select'} value={petType} onChange={onChangePetType}>
          {PET_TYPES.map((type) => {
            return <option className={'form--select--option'} value={type}>{type}</option>;
          })}
        </select>
      </Label>
      <Button text={getCopy('submit')} type={'primary'} onClick={onSubmitPetLocal}/>
    </Modal>
  );
}
