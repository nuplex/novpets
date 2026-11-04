import type {VeterinaryRecord} from "./VeterinaryRecord.ts";
import type {DataSource} from "./DataSource.ts";

export interface Pet {
  id: string;
  name: string;
  dataSources: DataSource[]; // TODO how to signal a valid data source is the user?
  records: Record<string, VeterinaryRecord>
  picture?: string;
}
