import { IDatabaseStrategy } from "../../../DriverAdapters/DriverAdapter.type.js";
import { databaseManager } from "../indexeDB/DatabaseManager.js";
// IndexedDB strategy
export class IndexedDBStrategy extends IDatabaseStrategy {
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
    async migrate(migrate) {
        return await databaseManager
            .getDb(migrate.databaseName)
            .migrate();
    }
    async prepare(migrate) {
        return await databaseManager.prepare(migrate);
    }
}
