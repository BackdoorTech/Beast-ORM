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
    delete(table, Query) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const condition = Query.where.shift();
            const hasIndex = Query.hasIndex;
            if (hasIndex && !Query.isParamsArray) {
                const idIndex = Object.values(condition)[0];
                await ObjectStore.enqueueTransaction(Object.assign({ operation: "delete", data: idIndex }, callbacks));
            }
            else if (Query.where.length == 0) {
                await ObjectStore.enqueueTransaction(Object.assign({ operation: "clear" }, callbacks));
            }
            callbacks.done();
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
    update(table, Query) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            if (Query.hasIndex) {
                if (Query.isParamsArray == false) {
                    const updateValues = Query.updateValues;
                    await ObjectStore.enqueueTransaction(Object.assign({ operation: "put", updateValues, data: updateValues }, callbacks));
                }
            }
            callbacks.done();
        };
    }
    select(table, Query) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            if (Query.where.length == 0) {
                await ObjectStore.enqueueTransaction(Object.assign({ operation: "getAll", item: null }, callbacks));
            }
            callbacks.done();
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
