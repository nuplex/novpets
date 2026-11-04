import type {Page} from "./SideNavigation.tsx";

export type IconPosition = 'left' | 'right';

export type OnChangePageParameters = {
  page: Page;
  payload?: Record<string, any>;
};

export type PetRecordsChangePagePayload = {
  shownPets: string[];
  searchTerm: string;
};

export type SyncState = 'not_synced' | 'syncing' | 'synced';
