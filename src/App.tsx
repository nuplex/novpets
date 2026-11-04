import { useState } from 'react';
import './App.css';
import {PetHome} from "./display/page/PetHome.tsx";
import {PetRecords} from "./display/page/PetRecords.tsx";
import type {OnChangePageParameters, PetRecordsChangePagePayload} from "./display/types.ts";
import type {User} from "./core/User.ts";
import {DataService} from "./service/DataService.ts";
import {APP_USER_ID} from "./mock/mockAppData.ts";
import {TextWithIcon} from "./display/component/Text.tsx";
import {getCopy} from "./service/CopyService.ts";
import {Icon} from "./display/component/Icon.tsx";
import {type Page, SideNavigation} from "./display/SideNavigation.tsx";
import {DataSources} from "./display/page/DataSources.tsx";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [loadedUser, setLoadedUser] = useState(false);
  const [changePagePayload, setChangePagePayload] = useState<Record<string, any>>();
  const [user, setUser] = useState<User>(DataService.getUser(APP_USER_ID));

  if (!loadedUser && !user) {
    setUser(DataService.getUser(APP_USER_ID));
    setLoadedUser(true);
    setCurrentPage('home');
  }

  // This is simple page changing; something like React Router is more robust for larger projects.
  const onChangePage = ({
    page,
    payload
  }: OnChangePageParameters) => {
    if (payload) {
      setChangePagePayload(payload);
    }
    setUser(DataService.getUser(APP_USER_ID));
    setCurrentPage(page);
  };

  let page = null;
  if (user) {
    switch (currentPage) {
      case 'dataSources':
        page = <DataSources userData={user} onChangePage={onChangePage}/>;
        break;
      case 'records':
        const shownPets = (changePagePayload as PetRecordsChangePagePayload)?.shownPets ?? [];
        const searchTerm = (changePagePayload as PetRecordsChangePagePayload)?.searchTerm ?? '';
        page = <PetRecords userData={user} shownPets={shownPets} searchTermData={searchTerm}/>;
        break;
      default:
      case 'home':
        page = <PetHome userData={user} onChangePage={onChangePage}/>;
    }
  }

  return (
    <div id={"app"}>
      <TextWithIcon
        classes={['logo']}
        text={getCopy('siteName')}
        textClasses={['logo--text']}
        icon={<Icon classes={['logo--icon']} iconId={'logo'}/>}
        iconPosition={'left'}
        onClick={() => onChangePage({page: 'home'})}
      />
      <div id={"site"}>
        <div id={'site-left'}>
          <SideNavigation onChangePage={onChangePage}/>
        </div>
        <div id={'site-right'}>
          {page}
        </div>
      </div>
    </div>
  );
}

export default App;
