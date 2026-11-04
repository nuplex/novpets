import type {RecordBodyElement, RecordDetail, VeterinaryRecord} from "../../../core/VeterinaryRecord.ts";
import {Header, Text} from "../Text.tsx";
import {getCopy} from "../../../service/CopyService.ts";
import {Modal} from "./Modal.tsx";
import {DATA_SOURCE_ADDED_BY_USER_ID} from "../../../core/DataSource.ts";
import {formatDate} from "../../util.ts";
import {Divider} from "../Divider.tsx";
import {Button} from "../Button.tsx";


export function ViewRecordDetailBodyElement({
  detail
}: {
  detail: RecordBodyElement
}) {
  return (
    <div className={'record-detail-body-element'}>
      {detail.header ? <Header type={'h4'} text={detail.header}/> : null}
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
      <Header type={'h3'} text={detail.header}/>
      {detail.body.map((item, index) => {
        return (
          <ViewRecordDetailBodyElement key={`rd${index}`} detail={item}/>
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
    <Modal classes={['modal--large']} onClose={onClose}>
      <Header classes={['text-capitalize', 'view-record--header']} type={'h1'} text={record.type}/>
      <Text classes={['text--small']} value={`${importedText} on ${date}`}/>
      <Divider/>
      {record.details.map((detail, index) => {
        return (
          <section key={`vrd${index}`}>
            <ViewRecordDetail  detail={detail}/>
            {record.details.length !== index + 1 ?
              <Divider/>
              : null}
          </section>
        );
      })}
      <Button
        classes={['modal--close-button']}
        text={getCopy('modalCloseButtonText')}
        type={'secondary'}
        onClick={onClose}
      />
    </Modal>
  );
}
