import { databaseManager } from "../indexeDB/DatabaseManager.js";
// IndexedDB strategy
export class IndexedDBStrategy {
    constructor(databaseName) {
        this.databaseName = databaseName;
    }
    openDatabase() {
        return async (callbacks) => {
            // return indexedDB.open(this.databaseName);
        };
    }
    delete(table, data) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(this.tableName);
            for (const item of data) {
                ObjectStore.enqueueTransaction(Object.assign({ operation: "delete", item }, callbacks));
            }
        };
    }
    insert(table, data) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            let index = 0;
            for (const item of data) {
                await ObjectStore.enqueueTransaction(Object.assign({ operation: "add", index, data: item }, callbacks));
                index++;
            }
            callbacks.done();
        };
    }
    select(table, data) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(this.tableName);
            const _callbacks = {
                onsuccess: (completeList) => {
                },
                onerror: () => { }
            };
            ObjectStore.enqueueTransaction({ operation: "all", item: null, callbacks: _callbacks });
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
            await databaseManager.prepare(migrate);
            done();
        };
    }
}
