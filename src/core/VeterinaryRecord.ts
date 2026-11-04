import type {IconId} from "../display/component/Icon.tsx";
import {getCopy} from "../service/CopyService.ts";

export const RECORD_TYPES = ['visit', 'prescription', 'emergency', 'intake'] as const;

export type RecordType = typeof RECORD_TYPES[number];

export type RecordBodyElement = {
  header?: string;
  text: string;
};

export type RecordDetail = {
  header: string;
  icon?: string;
  body: RecordBodyElement[];
};

export type VeterinaryRecord = {
  id: string;
  petId: string;
  dataSourceId: string;
  dataSourceName: string;
  timestamp: number;
  type: RecordType;
  icon?: IconId;
  details: RecordDetail[];
};

const RECORD_TYPE_ICON_MAP:Record<RecordType, IconId> = {
  visit: 'record',
  prescription: 'record',
  emergency: 'record',
  intake: 'record',
};

export function toRecordBodyDataElement({
  header,
  text,
}: {
  header?: string;
  text: string;
}): RecordBodyElement {
  return {
    header,
    text,
  };
}

export function toRecordDetail({
  header,
  icon,
  body,
}:{
  header?: string;
  icon?: string;
  body: RecordBodyElement[];
}): RecordDetail {
  return {
    header: header ?? getCopy('recordDefaultHeader'),
    icon,
    body,
  };
}

export function toVeterinaryRecord({
  petId,
  dataSourceId,
  dataSourceName,
  type,
  details = [],
}:{
  petId: string;
  dataSourceId: string;
  dataSourceName: string;
  type: RecordType;
  details: RecordDetail[];
}): VeterinaryRecord {
  const timestamp = Date.now();
  const id = `${timestamp}-${petId}-${dataSourceId}-${type}`;
  const icon = RECORD_TYPE_ICON_MAP[type];

  return {
    id,
    timestamp,
    petId,
    dataSourceId,
    dataSourceName,
    icon,
    type,
    details,
  };
}
