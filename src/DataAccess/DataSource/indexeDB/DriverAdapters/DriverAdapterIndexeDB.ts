import { IDatabaseStrategy, IMigrations } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
// IndexedDB strategy
export class IndexedDBStrategy extends IDatabaseStrategy {

  databaseName

  constructor() {
    super();
  }

  async openDatabase() {
    // return indexedDB.open(this.databaseName);
  }

  async insert(table, data) {
    const db = await this.openDatabase();
    // Implement IndexedDB insert here
  }

  async select(table, key) {
    const db = await this.openDatabase();
    // Implement IndexedDB select here
  }

  async migrate(migrate: IMigrations): Promise<any> {
    return await databaseManager
      .getDb(migrate.databaseName)
      .migrate()
  }

  async prepare(migrate: IMigrations): Promise<any> {
    return await databaseManager.prepare(migrate)
  }
}
