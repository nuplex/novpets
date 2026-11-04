import {type DataSource, toDataSource} from "../../../core/DataSource.ts";
import {type ChangeEvent, useState} from "react";
import {Header} from "../Text.tsx";
import {getCopy} from "../../../service/CopyService.ts";
import {Label} from "../Label.tsx";
import {Button} from "../Button.tsx";
import {Modal} from "./Modal.tsx";
import {Form} from "../Form.tsx";

export function AddDataSourceModal({
  onSubmitDataSource,
  onClose,
  editMode = false,
  editDataSource,
}:{
  onSubmitDataSource: (dataSource: DataSource) => void;
  onClose: () => void;
  editMode?: boolean;
  editDataSource?: DataSource;
}) {
  const [dataSourceName, setDataSourceName] = useState<string>(editDataSource?.name ?? '');
  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  const onChangeDataSourceName = (e: ChangeEvent<HTMLInputElement, HTMLInputElement>) => {
    const newDataSourceName = e.target.value;
    setDataSourceName(newDataSourceName);
    if (newDataSourceName.trim().length > 0) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  };

  const onSubmitDataSourceLocal = () => {
    if (!canSubmit) {
      return;
    }

    const dataSource = toDataSource({name: dataSourceName.trim(), id: editDataSource?.id});
    onSubmitDataSource(dataSource);
  };

  return (
    <Modal onClose={onClose}>
      <Header
        classes={['form--h1']}
        type={'h1'}
        text={getCopy(editMode ? 'modalEditDataSourceHeader' : 'modalAddDataSourceHeader')}
      />
      <Form>
        <Label text={getCopy('modalAddDataSourceNameLabel')} position={'top'}>
          <input
            className={'form--input'}
            value={dataSourceName}
            type={'text'}
            onChange={onChangeDataSourceName}
            placeholder={getCopy('modalAddDataSourceNamePlaceholder')}
          />
        </Label>
        <Button
          classes={['form--submit-button']}
          text={getCopy('submit')}
          type={'primary'}
          onClick={onSubmitDataSourceLocal}
          disabled={!canSubmit}
        />
      </Form>
    </Modal>
  );
}
