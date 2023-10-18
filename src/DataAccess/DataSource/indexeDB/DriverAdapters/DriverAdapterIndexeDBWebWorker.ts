import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
// IndexedDB strategy
export class IndexedDBStrategy implements IDatabaseStrategy {

  openDatabase() {
    return async (callbacks: IReturnObject) => {
      // return indexedDB.open(this.databaseName);
    }
  }

  insert(table, data) {

    // Implement IndexedDB insert here
    return async (callbacks: IReturnObject) => {
      const db = await this.openDatabase();
    }
  }

  select(table, key) {

    // Implement IndexedDB select here
    return async ( callbacks: IReturnObject) => {
      const db = await this.openDatabase();
    }
  }

  migrate(migrate: IMigrations) {
    return async ({onerror, onsuccess}: IReturnObject) => {
      databaseManager
      .getDb(migrate.databaseName)
      .migrate()
    }
  }

  prepare(migrate: IMigrations) {
    return async ({onerror, onsuccess, done}: IReturnObject) => {
      return await databaseManager.prepare(migrate)
      done()
    }

  }
}
