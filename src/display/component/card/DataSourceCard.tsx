import {DATA_SOURCE_ADDED_BY_USER_ID, type DataSource} from "../../../core/DataSource.ts";
import {Card} from "./Card.tsx";
import {Header, Text} from "../Text.tsx";
import {Icon} from "../Icon.tsx";
import {Button} from "../Button.tsx";
import {getCopy} from "../../../service/CopyService.ts";
import {Box} from "../Box.tsx";
import {getSyncCopy} from "../../util.ts";
import type {SyncState} from "../../types.ts";

export function DataSourceCard({
  dataSource,
  onClickCard,
  onClickEditDataSource,
  onClickDeleteDataSource,
  syncState,
}: {
  dataSource: DataSource;
  onClickCard: (args: any) => void;
  onClickEditDataSource: (args: any) => void;
  onClickDeleteDataSource: (args: any) => void;
  syncState: SyncState;
}) {
  const dataSourceRecords = Object.values(dataSource.records);
  const recordsText = `${dataSourceRecords.length} records`;

  const isOwnDataSource = dataSource.id === DATA_SOURCE_ADDED_BY_USER_ID;

  return (
    <Card onClick={onClickCard}>
      <div className={"card--header"}>
        <Box>
          <Icon classes={['icon--medium']} iconId={'database'}/>
        </Box>
        <Header type={'h3'} text={dataSource.name}/>
      </div>
      <Button
        classes={['view-record--button']}
        text={`${getCopy('viewDataSourceRecordsButtonText')}`}
        onClick={onClickCard}
        type={'secondary'}
      />
      <div className={'card--bottom'}>
        <Text classes={['text--small']} value={recordsText}/>
        <Text
          value={` ${getSyncCopy(syncState)}`}
          classes={['text--small']}
        />
      </div>
      <div className={'card--actions'}>
        <Icon iconId={'edit'} onClick={onClickEditDataSource}/>
        {!isOwnDataSource ? <Icon iconId={'delete'} onClick={onClickDeleteDataSource}/> : null}
      </div>
    </Card>
  );
}
