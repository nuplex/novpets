import {getPetRecordsAsArray, type Pet} from "../../core/Pet.ts";
import {Card} from "./Card.tsx";
import {Header, Text} from "./Text.tsx";
import {Icon} from "./Icon.tsx";
import {Button} from "./Button.tsx";
import {getCopy} from "../../service/CopyService.ts";
import {Box} from "./Box.tsx";
import {getIconIdForPetType, getSyncCopy} from "../util.ts";
import type {SyncState} from "../types.ts";

export function PetCard({
  pet,
  onClickCard,
  onClickAddRecord,
  onClickEditPet,
  onClickDeletePet,
  syncState,
}: {
  pet: Pet;
  onClickCard: (args: any) => void;
  onClickAddRecord: (args: any) => void;
  onClickEditPet: (args: any) => void;
  onClickDeletePet: (args: any) => void;
  syncState: SyncState;
  //TODO add "isSynced" which becomes true when sync is pressed.
}) {
  const petRecords = getPetRecordsAsArray(pet.records);
  const recordsText = `${petRecords.length} records`;

  return (
    <Card onClick={onClickCard}>
      <div className={"card--header"}>
        <Box>
          <Icon classes={['icon--medium']} iconId={getIconIdForPetType(pet.type)}/>
        </Box>
        <Header type={'h3'} text={pet.name}/>
      </div>
      <Button
        classes={['add-pet--add-record-button']}
        text={`${getCopy('addPetAddRecordButtonText')} ${pet.name}`}
        type={'secondary'}
        onClick={onClickAddRecord}
      />
      <div className={'card--bottom'}>
        <Text classes={['text--small']} value={recordsText}/>
        <Text
          value={` ${getSyncCopy(syncState)}`}
          classes={['text--small']}
        />
      </div>
      <div className={'card--actions'}>
        <Icon iconId={'edit'} onClick={onClickEditPet}/>
        <Icon iconId={'delete'} onClick={onClickDeletePet}/>
      </div>
    </Card>
  );
}
