import {type Pet, PET_TYPES, type PetType, toPet} from "../../../core/Pet.ts";
import {type ChangeEvent, useState} from "react";
import {Header} from "../Text.tsx";
import {getCopy} from "../../../service/CopyService.ts";
import {Label} from "../Label.tsx";
import {Button} from "../Button.tsx";
import {Modal} from "./Modal.tsx";
import {toTitleCase} from "../../util.ts";
import {Form} from "../Form.tsx";

export function AddPetModal({
  onSubmitPet,
  onClose,
  editMode = false,
  editPet,
}:{
  onSubmitPet: (pet: Pet) => void;
  onClose: () => void;
  editMode?: boolean;
  editPet?: Pet;
}) {
  const [petName, setPetName] = useState<string>(editPet?.name ?? '');
  const [petType, setPetType] = useState<PetType>(editPet?.type ?? 'dog');
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const onChangePetName = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const newPetName = e.target.value;
    setPetName(newPetName);
    if (newPetName.trim().length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const onChangePetType = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setPetType(e.target.value as PetType);
  };

  const onSubmitPetLocal = () => {
    if (!canSubmit) {
      return;
    }

    const pet = toPet({name: petName.trim(), type: petType});
    onSubmitPet(pet);
  };

  return (
    <Modal onClose={onClose}>
      <Header
        classes={['form--h1']}
        type={'h1'}
        text={getCopy(editMode ? 'modalEditPetHeader' : 'modalAddPetHeader')}
      />
      <Form>
        <Label text={getCopy('modalAddPetNameLabel')} position={'top'}>
          <input
            className={'form--input'}
            value={petName}
            type={'text'}
            onChange={onChangePetName}
            placeholder={getCopy('modalAddPetNamePlaceholder')}
          />
        </Label>
        <Label text={getCopy('modalAddPetTypeLabel')} position={'top'}>
          <select className={'form--select'} value={petType} onChange={onChangePetType}>
            {PET_TYPES.map((type) => {
              return <option key={type} value={type}>{toTitleCase(type)}</option>;
            })}
          </select>
        </Label>
        <Button
          classes={['form--submit-button']}
          text={getCopy('submit')}
          type={'primary'}
          onClick={onSubmitPetLocal}
          disabled={!canSubmit}
        />
      </Form>
    </Modal>
  );
}
