export const RECORD_TYPES = ['TEST'] as const;

export type RecordType = typeof RECORD_TYPES[number];

export type RecordSubDetailType = 'textOnly' | 'subheaderAndText' | ''

export interface RecordSubDetail {

}

export interface RecordDetail {
  header: string;
  body: RecordSubDetail;
}

export interface VeterinaryRecord {
  petId: string;
  dataSourceId: string;
  dataSourceName: string;
  timestamp: number;
  type: RecordType[];
  details: RecordDetail[];
}
