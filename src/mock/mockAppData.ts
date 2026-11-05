import {type DataSource, toDataSource} from "../core/DataSource.ts";
import {
  RECORD_TYPES, type RecordType,
  toRecordBodyDataElement,
  toRecordDetail,
  toVeterinaryRecord,
  type VeterinaryRecord
} from "../core/VeterinaryRecord.ts";
import {loremIpsum} from "lorem-ipsum";
import type {User} from "../core/User.ts";
import type {Pet} from "../core/Pet.ts";

const MOCK_DATA_SOURCES: DataSource[] = [
  toDataSource({
    id: 'vw',
    name: 'VetWorld',
    records: {},
  }),
  toDataSource({
    id: 'tpc',
    name: 'The Pet Clinic',
    records: {},
  }),
  toDataSource({
    id: 'pcg',
    name: 'Petcare Group',
    records: {}
  })
];

// Mock user ID so the application has a test user.
export const APP_USER_ID = 'test';

/**
 * Generates random records to mimic the application pulling in new information.
 * @param amount
 * @param dataSourceId
 * @param dataSourceName
 * @param petId
 */
function generateRecords({
  amount,
  dataSourceId,
  dataSourceName,
  petId,
}:{
  amount: number;
  dataSourceId: string;
  dataSourceName: string;
  petId: string;
}): Record<string, VeterinaryRecord> {
  const records: Record<string, VeterinaryRecord> = {};

  let i = amount;
  while (i > 0) {
    const recordId = `${dataSourceId}_test_gen_${i}`;
    records[recordId] = toVeterinaryRecord({
      petId,
      dataSourceId,
      dataSourceName,
      type: getRandomValueFromArray(RECORD_TYPES as unknown as string[]) as RecordType,
      details: [
        toRecordDetail({
          body: [
            toRecordBodyDataElement({
              text: loremIpsum({
                count: Math.ceil(Math.random() * 10),
              })
            }),
          ]
        })
      ]
    });
    i--;
  }

  return records;
}

function getRandomValueFromArray<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Returns mock records based on the users current pets.
 * @param user
 */
export function getMockRecords(user: User): Record<string, DataSource> {
  const externalData: Record<string, DataSource> = {};
  MOCK_DATA_SOURCES.forEach((dataSource) => {
    dataSource.records = generateRecords({
      amount: Math.ceil(Math.random() * 10) + 3,
      dataSourceId: dataSource.id,
      dataSourceName: dataSource.name,
      petId: getRandomValueFromArray<Pet>(user.pets).id,
    });
    externalData[dataSource.id] = {...dataSource};
  });

  return externalData;
}
