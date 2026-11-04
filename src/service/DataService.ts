import type {User} from "../core/User.ts";
import {updateLocalStorage} from "./utils.ts";

/**
 * This class acts as a data retriever for the application.
 * This allows the data source to be swapped from a unified service, rather than where a call is needed in the app.
 * For example, the functions could be hooked up to an actual external API, rather than local utilities and mock data.
 * For the purposes of this exercise, it is hooked up to local mocked data, and data is stored in localStorage.
 */
export class NovPetsDataService {
  updateUser({userId, payload}:{userId: string, payload: Partial<User>}) {
    // TODO this should be split out into smaller functions, e.g. updatePet, updateMedicalRecord, updateDataSource
    updateLocalStorage(userId, JSON.stringify(payload));
  }

  getPets(userId: string) {

  }
}