import type {Pet} from "./Pet.ts";

export interface User {
  name: string;
  pets: Pet[];
}
