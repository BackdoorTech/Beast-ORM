import { databaseManager } from "../indexeDB/DatabaseManager.js";
import { CreateQueryReaderSelect } from "../../../QueryReader/queryReader.js";
import { SqlObject } from "../../../filter/sqlObject/sqlObject.js";
// IndexedDB strategy
const emptyCallBacks = {
    onsuccess: () => { },
    onerror: () => { },
    done: () => { }
};
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
            const idIndex = Object.values(condition)[0];
            await ObjectStore.enqueueTransaction(Object.assign({ operation: "delete", data: idIndex }, callbacks));
            callbacks.done();
        };
    }
    deleteMany(table, Query) {
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            if (Query.where.length == 0) {
                await ObjectStore.enqueueTransaction(Object.assign({ operation: "clear" }, callbacks));
            }
            else {
                const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
                const result = await ObjectStore.enqueueTransaction(Object.assign({ operation: "getAll", item: null }, emptyCallBacks));
                const queryReader = CreateQueryReaderSelect(Query);
                let filteredRow = [];
                if (result.isOk) {
                    const rows = result.value.data;
                    const sqlObject = new SqlObject(TableSchema, queryReader);
                    filteredRow = await sqlObject.run(rows);
                    for (const row of filteredRow) {
                        const idFieldName = TableSchema.id.keyPath;
                        const id = row[idFieldName];
                        ObjectStore.enqueueTransaction(Object.assign({ operation: "delete", data: id }, callbacks));
                    }
                    callbacks.done(filteredRow);
                    return;
                }
                else {
                    callbacks.done(filteredRow);
                }
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
                delete item.userId;
                await ObjectStore.enqueueTransaction(Object.assign({ operation: "add", index, data: item }, callbacks));
                index++;
            }
            callbacks.done();
        };
    }
    insertMany(table, data) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            let index = 0;
            for (const item of data) {
                delete item.userId;
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
    updateMany(table, Query) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const queryReader = CreateQueryReaderSelect(Query);
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
            const updateValues = Query.updateValues;
            const result = await ObjectStore.enqueueTransaction(Object.assign({ operation: "getAll", item: null }, emptyCallBacks));
            let filteredRow = [];
            if (result.isOk) {
                const rows = result.value.data;
                const sqlObject = new SqlObject(TableSchema, queryReader);
                filteredRow = await sqlObject.run(rows);
                //const lastElement = filteredRow.pop()
                for (const row of filteredRow) {
                    const updatedValues = Object.assign(row, updateValues);
                    ObjectStore.enqueueTransaction(Object.assign({ operation: "put", data: updatedValues }, callbacks));
                }
                callbacks.done(filteredRow);
                return;
            }
            else {
                callbacks.done(filteredRow);
            }
        };
    }
    select(table, Query) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const queryReader = CreateQueryReaderSelect(Query);
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
            const result = await ObjectStore.enqueueTransaction(Object.assign({ operation: "getAll", item: null }, emptyCallBacks));
            if (result.isOk) {
                const rows = result.value.data;
                const sqlObject = new SqlObject(TableSchema, queryReader);
                const filteredRow = await sqlObject.run(rows);
                callbacks.done(filteredRow);
                return;
            }
            // callbacks.done()
        };
    }
    selectMany(table, Query) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const queryReader = CreateQueryReaderSelect(Query);
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
            if (queryReader.hasNoCondition) {
                const result = await ObjectStore.enqueueTransaction(Object.assign({ operation: "getAll", item: null }, callbacks));
                if (result.isOk) {
                    callbacks.done(result.value.data);
                }
                else {
                    callbacks.done([]);
                }
            }
            else {
                const result = await ObjectStore.enqueueTransaction(Object.assign({ operation: "getAll", item: null }, emptyCallBacks));
                let filteredRow = [];
                if (result.isOk) {
                    const rows = result.value.data;
                    const sqlObject = new SqlObject(TableSchema, queryReader);
                    filteredRow = await sqlObject.run(rows);
                    callbacks.done(filteredRow);
                    return;
                }
                else {
                    callbacks.done(filteredRow);
                    return;
                }
            }
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
