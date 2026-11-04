import type {VeterinaryRecord} from "./VeterinaryRecord.ts";

export const PET_TYPES = ['dog', 'cat', 'bird', 'other'] as const;

export type PetType = typeof PET_TYPES[number];

export type Pet = {
  id: string;
  name: string;
  type: PetType
  records: Record<string, VeterinaryRecord>;
};

export function toPet({
  name,
  type,
}: {
  name: string;
  type: PetType;
}): Pet {
  const id = type + name;
  return {
    id,
    name,
    type,
    records: {},
  };
}

export function getPetRecordsAsArray(records: Record<string, VeterinaryRecord>): VeterinaryRecord[] {
  return Object.values(records);
}
