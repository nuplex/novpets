import type {RecordBodyElement, RecordDetail, VeterinaryRecord} from "../../core/VeterinaryRecord.ts";
import {Header, Text} from "./Text.tsx";
import {getCopy} from "../../service/CopyService.ts";
import {Modal} from "./Modal.tsx";
import {DATA_SOURCE_ADDED_BY_USER_ID} from "../../core/DataSource.ts";
import {formatDate} from "../util.ts";


export function ViewRecordDetailBodyElement({
  detail
}: {
  detail: RecordBodyElement
}) {
  return (
    <div className={'record-detail-body-element'}>
      {detail.header ? <Header type={'h3'} text={detail.header}/> : null}
      <Text value={detail.text}/>
    </div>
  );
}

export function ViewRecordDetail({
  detail
}: {
  detail: RecordDetail
}) {
  return (
    <div className={'record-detail'}>
      <Header type={'h2'} text={detail.header}/>
      {detail.body.map((item) => {
        return (
          <ViewRecordDetailBodyElement detail={item}/>
        );
      })}
    </div>
  );
}

export function ViewRecordModal({
  record,
  onClose
}: {
  record: VeterinaryRecord;
  onClose: () => void;
}) {
  const importedText =
    record.dataSourceId === DATA_SOURCE_ADDED_BY_USER_ID ?
      getCopy('recordUserAddedText') :
      `${getCopy('recordImportFromText')}${record.dataSourceName}`;

  const date = formatDate(record.timestamp);

  return (
    <Modal onClose={onClose}>
      <Header type={'h1'} text={record.type}/>
      <Text classes={['text--subheader']} value={importedText}/>
      <Text classes={['text--note']} value={date}/>
      {record.details.map((detail) => {
        return (
          <ViewRecordDetail detail={detail}/>
        );
      })}
    </Modal>
  );
}
