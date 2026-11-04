import {Card} from "./Card.tsx";
import {Header, Text} from "../Text.tsx";
import {Icon} from "../Icon.tsx";
import {Button} from "../Button.tsx";
import {getCopy} from "../../../service/CopyService.ts";
import type {VeterinaryRecord} from "../../../core/VeterinaryRecord.ts";
import {getSingleSyncCopy} from "../../util.ts";
import type {SyncState} from "../../types.ts";
import {Box} from "../Box.tsx";
import {DATA_SOURCE_ADDED_BY_USER_ID} from "../../../core/DataSource.ts";

export function RecordCard({
  record,
  petName,
  onClickCard,
  onClickEditRecord,
  onClickDeleteRecord,
  syncState,
}: {
  record: VeterinaryRecord;
  petName: string;
  onClickCard: (args: any) => void;
  onClickEditRecord: (args: any) => void;
  onClickDeleteRecord: (args: any) => void;
  syncState: SyncState;
}) {
  const importText = record.dataSourceId === DATA_SOURCE_ADDED_BY_USER_ID ?
    'Added by You' :
    `${getCopy('recordImportFromText')}${record.dataSourceName}`;

  return (
    <Card onClick={onClickCard}>
      <div className={'record-card--top'}>
        <div className={'card--header'}>
          <Box>
            <Icon classes={['icon--medium']} iconId={'record'}/>
          </Box>
          <Header classes={['text-capitalize']} type={'h3'} text={record.type}/>
        </div>
        <div className={'record-card-header-text'}>
          <Header type={'h4'} text={importText}/>
          <Text classes={['text-block text--small']} value={petName}/>
        </div>
      </div>
      <Button
        classes={['view-record--button']}
        text={getCopy('cardRecordButtonText')}
        type={'secondary'}
        onClick={onClickCard}
      />
      <div className={'card--bottom'}>
        <Text classes={['text--small']} value={getSingleSyncCopy(syncState)}/>
      </div>
      <div className={'card--actions'}>
          <Icon iconId={'edit'} onClick={onClickEditRecord}/>
          <Icon iconId={'delete'} onClick={onClickDeleteRecord}/>
      </div>
    </Card>
  );
}
