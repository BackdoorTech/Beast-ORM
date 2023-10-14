import { IDatabaseStrategy } from "../../../DriverAdapters/DriverAdapter.type";
import { IndexedDB } from '../indexeDB/indexeDB'
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
}
