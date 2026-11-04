import type {VeterinaryRecord} from "./VeterinaryRecord.ts";

export interface DataSource {
  id: string;
  name: string;
  records: Record<string, VeterinaryRecord>;
  isSynced: boolean;
  logo?: string;
}