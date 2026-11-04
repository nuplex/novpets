import type {Pet} from "./Pet.ts";
import {DATA_SOURCE_ADDED_BY_USER_ID, type DataSource} from "./DataSource.ts";

export type User = {
  id: string;
  name: string;
  pets: Pet[];
  dataSources: Record<string, DataSource>;
};

export function getUserDataSourcesArray(user: User): DataSource[] {
  return Object.values(user.dataSources).filter((dataSource) => dataSource.id !== DATA_SOURCE_ADDED_BY_USER_ID);
}