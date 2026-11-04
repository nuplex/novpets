import type {PetType} from "../core/Pet.ts";
import type {IconId} from "./component/Icon.tsx";
import type {SyncState} from "./types.ts";
import {getCopy} from "../service/CopyService.ts";
import type {RecordBodyElement} from "../core/VeterinaryRecord.ts";

export function formatDate(timestamp: number) {
  return (new Intl.DateTimeFormat('en-US').format(timestamp));
}

export function getIconIdForPetType(type: PetType): IconId {
  switch(type) {
    case 'bird':
      return 'bird';
    default:
      return 'paw';
  }
}

export function getSingleSyncCopy(state: SyncState) {
  switch (state) {
    case "not_synced":
      return getCopy('cardRecordNotSynced');
    case "syncing":
      return getCopy('cardRecordSyncing');
    case "synced":
      return getCopy('cardRecordSynced');
  }
}

export function getSyncCopy(state: SyncState) {
  switch (state) {
    case "not_synced":
      return getCopy('cardRecordsNotSynced');
    case "syncing":
      return getCopy('cardRecordsSyncing');
    case "synced":
      return getCopy('cardRecordsSynced');
  }
}

/**
 * Checks if a record has content
 * @param details
 */
export function detailsHasContent(details: RecordBodyElement[]): boolean {
  return details.some((detail) => detail.text.length > 0);
}

// Modified function from Gemini. Used to capitalize select element options.
export function toTitleCase(str: string): string {
  return str
  .toLowerCase()
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
}
