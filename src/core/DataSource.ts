import type {VeterinaryRecord} from "./VeterinaryRecord.ts";

export const DATA_SOURCE_ADDED_BY_USER_ID = '_user';
export const DATA_SOURCE_ADDED_BY_USER_NAME = 'Added By You';

export type DataSource = {
  id: string;
  name: string;
  records: Record<string, VeterinaryRecord>;
  logo?: string;
};

export function toDataSource({
  id,
  name,
  records = {},
  logo
}: {
  id?: string;
  name: string;
  records?: Record<string, VeterinaryRecord>;
  logo?: string;
}): DataSource {
  return {
    id: id ?? `${name.replaceAll(' ','-')}_${Date.now()}`,
    name,
    records,
    logo,
  };
}
