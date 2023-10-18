import { databaseManager } from "../indexeDB/DatabaseManager.js";
// IndexedDB strategy
export class IndexedDBStrategy {
    openDatabase() {
        return async (callbacks) => {
            // return indexedDB.open(this.databaseName);
        };
    }
    insert(table, data) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const db = await this.openDatabase();
        };
    }
    select(table, key) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const db = await this.openDatabase();
        };
    }
    migrate(migrate) {
        return async ({ onerror, onsuccess }) => {
            databaseManager
                .getDb(migrate.databaseName)
                .migrate();
        };
    }
    prepare(migrate) {
        return async ({ onerror, onsuccess, done }) => {
            return await databaseManager.prepare(migrate);
            done();
        };
    }
}
