import type {VeterinaryRecord} from "./VeterinaryRecord.ts";

export const PET_TYPES = ['dog', 'cat', 'bird', 'fish', 'reptile', 'rodent', 'horse', 'other (exotic)', 'other (livestock)', 'other'] as const;

export type PetType = typeof PET_TYPES[number];

export type Pet = {
  id: string;
  name: string;
  type: PetType
  records: Record<string, VeterinaryRecord>;
};

export function toPet({
  id,
  name,
  type,
  records = {},
}: {
  id?: string;
  name: string;
  type: PetType;
  records?: Record<string, VeterinaryRecord>
}): Pet {
  return {
    id: id ?? type + name,
    name,
    type,
    records: records ?? {},
  };
}

export function getPetRecordsAsArray(records: Record<string, VeterinaryRecord>): VeterinaryRecord[] {
  return Object.values(records);
}
