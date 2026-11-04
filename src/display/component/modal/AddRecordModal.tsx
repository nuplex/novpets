import {
  RECORD_TYPES,
  type RecordBodyElement,
  type RecordType,
  toRecordBodyDataElement, toRecordDetail, toVeterinaryRecord,
  type VeterinaryRecord
} from "../../core/VeterinaryRecord.ts";
import {type ChangeEvent, useState} from "react";
import {DATA_SOURCE_ADDED_BY_USER_ID, DATA_SOURCE_ADDED_BY_USER_NAME} from "../../core/DataSource.ts";
import {Header} from "./Text.tsx";
import {getCopy} from "../../service/CopyService.ts";
import {Label} from "./Label.tsx";
import {Icon} from "./Icon.tsx";
import {Button} from "./Button.tsx";
import {Modal} from "./Modal.tsx";

export function AddRecordModal({
  petId,
  dataSources,
  onSubmitRecord,
  onClose,
}:{
  petId: string;
  dataSources: string[];
  onSubmitRecord: (record: VeterinaryRecord) => void;
  onClose: () => void;
}) {
  const [recordType, setRecordType] = useState<RecordType>('intake');
  const [recordDataSource, setRecordDataSource] = useState<string>('');
  const [details, setDetails] = useState<RecordBodyElement[]>([]);

  const onChangeRecordType = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setRecordType(e.target.value as RecordType);
  };

  const onChangeRecordDataSource = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setRecordDataSource(e.target.value.trim());
  };

  const onAddDetail = () => {
    const newDetails = [...details];
    newDetails.push(toRecordBodyDataElement({text: ''}));
    setDetails(newDetails);
  };

  const onChangeDetail = (index: number, changedDetail: Partial<RecordBodyElement>) => {
    const newDetails = [...details];
    const detail = newDetails[index];
    detail.header = changedDetail?.header ?? detail.header;
    detail.text = changedDetail?.text ?? detail.text;
    newDetails[index] = detail;
    setDetails(newDetails);
  };

  const onRemoveDetail = (index: number) => {
    const newDetails = details.filter((_detail, i) => i !== index);
    setDetails(newDetails);
  };

  const onSubmitRecordLocal = () => {
    const record = toVeterinaryRecord({
      petId,
      dataSourceId: DATA_SOURCE_ADDED_BY_USER_ID,
      dataSourceName: DATA_SOURCE_ADDED_BY_USER_NAME,
      type: recordType,
      details: [
        toRecordDetail({
          header: getCopy('recordDefaultHeader'),
          body: details,
        })
      ], // TODO I think this should just be key/value and then use the body elements are for display, so built based off type.
    });
    onSubmitRecord(record);
  };

  /* Local Compute */

  const userIsAddingOwnRecord = recordDataSource === DATA_SOURCE_ADDED_BY_USER_ID;

  return (
    <Modal onClose={onClose}>
      <Header type={'h1'} text={getCopy('modalAddRecordHeader')}/>
      <Label text={getCopy('modalAddRecordTypeLabel')} position={'top'}>
        <select className={'form--select'} value={recordType} onChange={onChangeRecordType}>
          {RECORD_TYPES.map((type) => {
            return <option className={'form--select--option'}>{type}</option>;
          })}
        </select>
      </Label>
      <Label text={getCopy('modalAddRecordDataSourceLabel')} position={'top'}>
        <select className={'form--select'} value={recordDataSource} onChange={onChangeRecordDataSource}>
          <option className={'form--select--option'} value={DATA_SOURCE_ADDED_BY_USER_ID}>{getCopy('modalAddRecordDataSourceUserOption')}</option>
          {dataSources.map((type) => {
            return <option className={'form--select--option'} value={type}>{type}</option>;
          })}
        </select>
      </Label>
      {userIsAddingOwnRecord ?
        <>
          <Header type={'h2'} text={getCopy('modalAddRecordDetailHeader')}/>
          {details.map((detail, index) => {
            return (
              <div className={'add-record--detail'}>
                <Label text={getCopy('modalAddRecordDetailHeaderInputLabel')} position={'top'}>
                  <input
                    type={'text'}
                    value={detail.header}
                    onChange={(e) => onChangeDetail(index, {header: e.target.value})}
                    placeholder={getCopy('modalAddRecordDetailHeaderInputPlaceholder')}
                  />
                </Label>
                <Label text={getCopy('modalAddRecordDetailTextInputLabel')} position={'top'}>
                  <textarea
                    value={detail.text}
                    onChange={(e) => onChangeDetail(index, {text: e.target.value})}
                    placeholder={getCopy('modalAddRecordDetailTextInputPlaceholder')}
                  />
                </Label>
                <Icon iconId={'delete'} onClick={() => onRemoveDetail(index)}/>
              </div>
            );
          })}
          <Button text={getCopy('modalAddRecordDetailAddButtonText')} type={'secondary'} onClick={onAddDetail}/>
        </>
        : null}
      <Button text={'Submit'} type={'primary'} onClick={onSubmitRecordLocal}/>
    </Modal>
  );
}
