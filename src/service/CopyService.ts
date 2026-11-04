type CopyKey =
  | 'addPetHeader'
  | 'addPetSubheader'
  | 'addPetAddRecordButtonText'
  | 'addDataSourceHeader'
  | 'addDataSourceSubheader'
  | 'addRecordHeader'
  | 'addRecordSubheader'
  | 'cardRecordButtonText'
  | 'cardRecordNotSynced'
  | 'cardRecordSyncing'
  | 'cardRecordSynced'
  | 'cardRecordsNotSynced'
  | 'cardRecordsSyncing'
  | 'cardRecordsSynced'
  | 'dataSourceHomeTitle'
  | 'dataSourceHomeSubtitle'
  | 'filterHeader'
  | 'filterPlaceholder'
  | 'filterTip'
  | 'modalAddDataSourceHeader'
  | 'modalAddDataSourceNameLabel'
  | 'modalAddDataSourceNamePlaceholder'
  | 'modalAddPetHeader'
  | 'modalAddPetNameLabel'
  | 'modalAddPetTypeLabel'
  | 'modalAddPetNamePlaceholder'
  | 'modalAddRecordHeader'
  | 'modalAddRecordTypeLabel'
  | 'modalAddRecordDataSourceLabel'
  | 'modalAddRecordDataSourceNameLabel'
  | 'modalAddRecordDataSourceUserOption'
  | 'modalAddRecordDetailHeader'
  | 'modalAddRecordDetailHeaderInputLabel'
  | 'modalAddRecordDetailHeaderInputPlaceholder'
  | 'modalAddRecordDetailTextInputLabel'
  | 'modalAddRecordDetailTextInputPlaceholder'
  | 'modalAddRecordDetailAddButtonText'
  | 'modalAddRecordDetailDeleteButtonText'
  | 'modalAddRecordPetLabel'
  | 'modalCloseButtonText'
  | 'modalEditDataSourceHeader'
  | 'modalEditPetHeader'
  | 'modalEditRecordHeader'
  | 'navigationDataSources'
  | 'navigationHome'
  | 'navigationRecords'
  | 'petHomeTitle'
  | 'petHomeSubtitle'
  | 'petRecordsTitle'
  | 'petRecordsSubtitle'
  | 'recordDefaultHeader'
  | 'recordImportFromText'
  | 'recordUserAddedText'
  | 'searchbarPlaceholder'
  | 'siteName'
  | 'submit'
  | 'syncButton'
  | 'viewDataSourceRecordsButtonText';

const AppCopy: Record<CopyKey, string> = {
  addDataSourceHeader: 'Add a veterinary health system',
  addDataSourceSubheader: "Adding more systems helps fill in your pet's records",
  addPetHeader: 'Add your pet',
  addPetSubheader: '',
  addPetAddRecordButtonText: 'Add a record for',
  addRecordHeader: 'Add a record',
  addRecordSubheader: 'You can add a record from a specific source, or fill in your own record.',
  cardRecordButtonText: 'View record',
  cardRecordNotSynced: 'Out of Sync',
  cardRecordSyncing: 'Syncing...',
  cardRecordSynced: 'Up to date',
  cardRecordsNotSynced: '(out of sync)',
  cardRecordsSyncing: 'are syncing...',
  cardRecordsSynced: 'are up to date',
  dataSourceHomeTitle: 'Data Sources',
  dataSourceHomeSubtitle: "You can view, edit, and remove your data sources. Click on a data source to see it's records.",
  filterHeader: 'Filters',
  filterPlaceholder: 'Search records...',
  filterTip: `You can filter records by using the search bar, and/or by clicking the pets who's records you want to see.`,
  modalAddDataSourceHeader: 'Add a Data Source',
  modalAddDataSourceNameLabel: 'Data Source Name',
  modalAddDataSourceNamePlaceholder: 'My Local Veterinarian',
  modalAddPetHeader: 'Add your pet',
  modalAddPetNameLabel: 'Pet Name',
  modalAddPetNamePlaceholder: 'Rufus',
  modalAddRecordHeader: 'Add a Veterinary Record',
  modalAddPetTypeLabel: 'Type of Pet',
  modalAddRecordTypeLabel: 'Veterinary Record Type',
  modalAddRecordDataSourceLabel: 'Data Source',
  modalAddRecordDataSourceNameLabel: 'Data Source Name',
  modalAddRecordDataSourceUserOption: 'Add Your Own',
  modalAddRecordDetailHeader: 'Enter Record Details',
  modalAddRecordDetailHeaderInputLabel: 'Record Detail Name',
  modalAddRecordDetailHeaderInputPlaceholder: '(Optional)',
  modalAddRecordDetailTextInputLabel: 'Description',
  modalAddRecordDetailTextInputPlaceholder: 'Routine Check-Up',
  modalAddRecordDetailAddButtonText: 'Add a detail',
  modalAddRecordDetailDeleteButtonText: 'Delete detail',
  modalAddRecordPetLabel: 'Select a pet',
  modalCloseButtonText: 'Close',
  modalEditDataSourceHeader: 'Edit Data Source',
  modalEditPetHeader: 'Edit Pet',
  modalEditRecordHeader: 'Edit Veterinary Record',
  navigationDataSources: 'Data Sources',
  navigationHome: 'Overview',
  navigationRecords: 'Veterinary Records',
  petHomeTitle: 'Pets Overview',
  petHomeSubtitle: 'Manage your pets.',
  petRecordsTitle: 'Veterinary Records',
  petRecordsSubtitle: 'View and manage records for your pets.',
  recordDefaultHeader: 'Veterinary Record Information',
  recordImportFromText: 'Imported from ',
  recordUserAddedText: 'Added by you',
  searchbarPlaceholder: 'Start searching...',
  siteName: 'novpets',
  submit: 'Submit',
  syncButton: 'Sync Veterinary Records',
  viewDataSourceRecordsButtonText: 'View Records',
};

export function getCopy(key: CopyKey) {
  return AppCopy[key];
}
