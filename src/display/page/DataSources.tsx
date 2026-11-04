import {useState} from "react";
import {AddCard} from "../component/card/AddCard.tsx";
import {getCopy} from "../../service/CopyService.ts";
import {DataSourceCard} from "../component/card/DataSourceCard.tsx";
import type {DataSource} from "../../core/DataSource.ts";
import type {OnChangePageParameters, SyncState} from "../types.ts";
import {ModalContext} from "../component/modal/Modal.tsx";
import {DataService} from "../../service/DataService.ts";
import {Header, Text} from "../component/Text.tsx";
import {type User} from "../../core/User.ts";
import {AddDataSourceModal} from "../component/modal/AddDataSourceModal.tsx";
import {SyncRecordsButton} from "../component/button/SyncRecordsButton.tsx";

export function DataSources({
  userData,
  onChangePage
}:{
  userData: User;
  onChangePage: (args: OnChangePageParameters) => void;
}) {
  const [user, setUser] = useState<User>(userData);
  const [dataSources, setDataSources] = useState<Record<string, DataSource>>(userData.dataSources ?? []);
  const [showAddDataSourceModal, setShowAddDataSourceModal] = useState(false);
  const [showEditDataSourceModal, setShowEditDataSourceModal] = useState(false);
  const [selectedDataSource, setSelectedDataSource] = useState<DataSource>();
  const [syncState, setSyncState] = useState<SyncState>('not_synced');

  /* Local Functions */
  const onAddDataSource = (dataSource: DataSource) => {
    const updatedUser = showAddDataSourceModal ?
      DataService.addDataSource({userId: user.id, dataSource}) :
      DataService.editDataSource({userId: user.id, dataSource});
    setUser(updatedUser);
    setDataSources(updatedUser?.dataSources ?? []);
    onCloseModal();
  };

  const onCloseModal = () => {
    setShowAddDataSourceModal(false);
    setShowEditDataSourceModal(false);
    setSelectedDataSource(undefined);
  };

  const onTriggerAddDataSource = () => {
    setShowAddDataSourceModal(true);
  };

  const onClickDataSourceCard = (dataSource: DataSource) => {
    onChangePage({page: 'records', payload: {searchTerm: dataSource.name}});
  };

  const onClickEditDataSource = (dataSource: DataSource, e: MouseEvent) => {
    setSelectedDataSource(dataSource);
    setShowEditDataSourceModal(true);
    e.stopPropagation();
  };

  const onClickDeleteDataSource = (dataSource: DataSource, e: MouseEvent) => {
    const updatedUser = DataService.deleteDataSource({userId: user.id, dataSourceId: dataSource.id});
    if (selectedDataSource?.id === dataSource.id) {
      setSelectedDataSource(undefined);
    }

    setDataSources(updatedUser.dataSources);

    e.stopPropagation();
  };

  const onSync = () => {
    setSyncState('syncing');
    const updatedUser  = DataService.syncRecords(user.id);
    console.log(updatedUser);
    setUser(updatedUser);
    setDataSources(updatedUser.dataSources);
    setSyncState('synced');
  };

  /* Local Compute */
  const dataSourcesArray = Object.values(dataSources);
  const hasDataSources = dataSourcesArray.length > 0;
  const hasPets = userData.pets.length > 0;

  return (
    <div className={"page"}>
      <div className={"page-top"}>
        <Header type={'title'} text={getCopy('dataSourceHomeTitle')}/>
        <Text classes={['subtitle']} value={getCopy('dataSourceHomeSubtitle')}/>
        {(hasDataSources && hasPets) ? <SyncRecordsButton classes={['page-top--sync']} onSync={onSync}/>: null}
      </div>
      <div className={"card-grid"}>
        {dataSourcesArray.map((dataSource: DataSource) => {
          return (
            <DataSourceCard
              key={dataSource.id}
              dataSource={dataSource}
              onClickCard={() => onClickDataSourceCard(dataSource)}
              onClickEditDataSource={(e: MouseEvent) => onClickEditDataSource(dataSource, e)}
              onClickDeleteDataSource={(e: MouseEvent) => onClickDeleteDataSource(dataSource, e)}
              syncState={syncState}
            />
          );
        })}
        <AddCard header={getCopy('addDataSourceHeader')} onClick={onTriggerAddDataSource}/>
      </div>
      {(showAddDataSourceModal || showEditDataSourceModal) ?
        <ModalContext>
          <AddDataSourceModal
            onSubmitDataSource={onAddDataSource}
            onClose={onCloseModal}
            editMode={showEditDataSourceModal}
            editDataSource={selectedDataSource}
          />
        </ModalContext>
        :
        null
      }
    </div>
  );
}
