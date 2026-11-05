import {
  RECORD_TYPES,
  type RecordBodyElement,
  type RecordType,
  toRecordBodyDataElement, toRecordDetail, toVeterinaryRecord,
  type VeterinaryRecord
} from "../../../core/VeterinaryRecord.ts";
import {type ChangeEvent, useState} from "react";
import {
  DATA_SOURCE_ADDED_BY_USER_ID,
  DATA_SOURCE_ADDED_BY_USER_NAME,
  type DataSource
} from "../../../core/DataSource.ts";
import {Header} from "../Text.tsx";
import {getCopy} from "../../../service/CopyService.ts";
import {Label} from "../Label.tsx";
import {Button} from "../Button.tsx";
import {Modal} from "./Modal.tsx";
import type {Pet} from "../../../core/Pet.ts";
import {toTitleCase} from "../../util.ts";
import {Form} from "../Form.tsx";

export function AddRecordModal({
  petId,
  allPets,
  dataSources,
  onSubmitRecord,
  onClose,
  editMode = false,
  editRecord,
}:{
  petId?: string;
  allPets?: Pet[];
  dataSources: DataSource[];
  onSubmitRecord: (record: VeterinaryRecord) => void;
  onClose: () => void;
  editMode?: boolean;
  editRecord?: VeterinaryRecord;
}) {
  const [selectedPetId, setSelectedPetId] = useState<string | undefined>(petId ?? allPets?.[0].id);
  const [recordType, setRecordType] = useState<RecordType>('intake');
  const [recordDataSource, setRecordDataSource] = useState<string>(DATA_SOURCE_ADDED_BY_USER_ID);
  const [canSubmit, setCanSubmit] = useState(false);
  // TODO, this basically flattens all detail bodies into one details; improve by allowing edit for each detail and its body.
  const [details, setDetails] = useState<RecordBodyElement[]>([]);

  if (editMode && editRecord && details.length === 0) {
    const allDetails: RecordBodyElement[] = [];
    editRecord.details.forEach((detail) => allDetails.push(...detail.body));
    setDetails(allDetails);
  }

  const onChangeRecordType = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setRecordType(e.target.value as RecordType);
  };

  const onChangeRecordDataSource = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setRecordDataSource(e.target.value);
  };

  const onChangePet = (e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {
    setSelectedPetId(e.target.value);
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

    if (detail.text.trim().length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const onRemoveDetail = (index: number) => {
    const newDetails = details.filter((_detail, i) => i !== index);
    setDetails(newDetails);
  };

  const onSubmitRecordLocal = () => {
    if (!canSubmit) {
      return;
    }

    if (!selectedPetId && !petId) {
      throw new Error('Neither petId or selectedPetId are defined in AddRecord.');
    }
    
    let dataSource: DataSource | undefined;
    if (recordDataSource !==  DATA_SOURCE_ADDED_BY_USER_ID) {
      dataSource = dataSources.find((dataSource) => dataSource.id === recordDataSource);
    }

    const record = toVeterinaryRecord({
      id: editRecord?.id,
      petId: petId ?? selectedPetId!,
      dataSourceId: dataSource?.id ?? DATA_SOURCE_ADDED_BY_USER_ID,
      dataSourceName: dataSource?.name ?? DATA_SOURCE_ADDED_BY_USER_NAME,
      type: recordType,
      details: [
        toRecordDetail({
          header: getCopy('recordDefaultHeader'),
          body: details,
        })
      ],
    });

    if (editMode && editRecord) {
      record.id = editRecord.id;
      // timestamp could also be fixed; but it might be better to have it reflect the last edited date.
    }

    onSubmitRecord(record);
  };

  return (
    <Modal classes={['modal--large']} onClose={onClose}>
      <Header type={'h1'} text={getCopy(editMode ? 'modalEditRecordHeader' : 'modalAddRecordHeader')}/>
      <Form>
        {(!petId && allPets) ? <Label text={getCopy('modalAddRecordPetLabel')} position={'top'}>
          <select className={'form--select'} value={petId} onChange={onChangePet}>
            {allPets.map((pet) => {
              return <option key={pet.id} className={'form--select--option'} value={pet.id}>{pet.name}</option>;
            })}
          </select>
        </Label> : null}
        <Label text={getCopy('modalAddRecordTypeLabel')} position={'top'}>
          <select className={'form--select'} value={recordType} onChange={onChangeRecordType}>
            {RECORD_TYPES.map((type) => {
              return <option key={type} className={'form--select--option'}>{toTitleCase(type)}</option>;
            })}
          </select>
        </Label>
        <Label text={getCopy('modalAddRecordDataSourceLabel')} position={'top'}>
          <select className={'form--select'} value={recordDataSource} onChange={onChangeRecordDataSource}>
            <option className={'form--select--option'} value={DATA_SOURCE_ADDED_BY_USER_ID}>{getCopy('modalAddRecordDataSourceUserOption')}</option>
            {dataSources.map((dataSource) => {
              return <option key={dataSource.id} className={'form--select--option'} value={dataSource.id}>{toTitleCase(dataSource.name)}</option>;
            })}
          </select>
        </Label>
        <Label
          textClasses={['label--medium']}
          position={'top'}
          text={getCopy('modalAddRecordDetailHeader')}
        >
          <div className={'add-record--details'}>
            {details.map((detail, index) => {
              return (
                <div key={`d${index}`} className={'add-record--detail'}>
                  <Form>
                    <Label text={getCopy('modalAddRecordDetailHeaderInputLabel')} position={'top'}>
                      <input
                        className={'form--input'}
                        type={'text'}
                        value={detail.header}
                        onChange={(e) => onChangeDetail(index, {header: e.target.value})}
                        placeholder={getCopy('modalAddRecordDetailHeaderInputPlaceholder')}
                      />
                    </Label>
                    <Label text={getCopy('modalAddRecordDetailTextInputLabel')} position={'top'}>
                      <textarea
                        className={'form--textarea'}
                        value={detail.text}
                        onChange={(e) => onChangeDetail(index, {text: e.target.value})}
                        placeholder={getCopy('modalAddRecordDetailTextInputPlaceholder')}
                      />
                    </Label>
                    <Button
                      text={getCopy('modalAddRecordDetailDeleteButtonText')}
                      type={'secondary-alt'}
                      onClick={() => onRemoveDetail(index)}
                    />
                  </Form>
                </div>
              );
            })}
            <Button
              classes={['form--secondary-button']}
              text={getCopy('modalAddRecordDetailAddButtonText')}
              type={'secondary'}
              onClick={onAddDetail}
            />
          </div>
        </Label>
        <Button
          classes={['form--submit-button']}
          text={'Submit'}
          type={'primary'}
          onClick={onSubmitRecordLocal}
          disabled={!canSubmit}
        />
      </Form>
    </Modal>
  );
}
