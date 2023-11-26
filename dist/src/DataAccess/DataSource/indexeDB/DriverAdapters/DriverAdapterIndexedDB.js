import { databaseManager } from "../indexeDB/DatabaseManager.js";
import { CreateQueryReaderSelect } from "../../../QueryReader/queryReader.js";
import { SqlObject } from "../../../filter/sqlObject/sqlObject.js";
import { ClearAllOperation, DeleteOperation, GetAllOperation, UpdateOperation, InsertOperation } from "../indexeDB/DatabaseOperations.js";
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
    addTrigger({ table, data }) {
        return async (callbacks) => {
            const database = await databaseManager.getDb(this.databaseName);
            database.registerTrigger(table, data, callbacks);
        };
    }
    RemoveTrigger({ table, data }) {
        return async (callbacks) => {
            const database = await databaseManager.getDb(this.databaseName);
            database.UnRegisterTrigger(table, data, callbacks);
            callbacks.done();
        };
    }
    openDatabase() {
        return async (callbacks) => {
            // return indexedDB.open(this.databaseName);
        };
    }
    delete({ table, query }) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const condition = query.where.shift();
            const idIndex = Object.values(condition)[0];
            const transaction = ObjectStore.findOrCreateNotDedicatedTransaction();
            const operation = new DeleteOperation({ callBacks: callbacks, pk: idIndex });
            operation.onDone(() => {
                callbacks.done();
            });
            transaction.enqueueOperation(operation);
            transaction.writeTransactionFlag();
            ObjectStore.processTransactionQueue();
        };
    }
    deleteMany({ table, query }) {
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const transaction1 = ObjectStore.findOrCreateNotDedicatedTransaction();
            if (query.where.length == 0) {
                const operation = new ClearAllOperation({ callBacks: callbacks });
                transaction1.enqueueOperation(operation).finally(() => {
                    callbacks.done();
                });
            }
            else {
                const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
                const operation = new GetAllOperation({ callBacks: emptyCallBacks });
                transaction1.enqueueOperation(operation).then(async (result) => {
                    const queryReader = CreateQueryReaderSelect(query);
                    let filteredRow = [];
                    if (result.isOk) {
                        const rows = result.value.data;
                        const sqlObject = new SqlObject(TableSchema, queryReader);
                        filteredRow = await sqlObject.run(rows);
                        const transaction2 = ObjectStore.findOrCreateNotDedicatedTransaction();
                        for (const row of filteredRow) {
                            const idFieldName = TableSchema.id.keyPath;
                            const id = row[idFieldName];
                            const operation = new DeleteOperation({ callBacks: emptyCallBacks, pk: id });
                            transaction2.enqueueOperation(operation);
                        }
                    }
                    callbacks.done(filteredRow);
                });
            }
            transaction1.writeTransactionFlag();
            ObjectStore.processTransactionQueue();
        };
    }
    insert({ table, rows }) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const transaction = ObjectStore.findOrCreateNotDedicatedTransaction();
            transaction.writeTransactionFlag();
            let index = 0;
            for (const item of rows) {
                const operation = new InsertOperation({ callBacks: callbacks, data: item, index, ObjectStore });
                transaction.enqueueOperation(operation);
            }
            ObjectStore.processTransactionQueue();
            transaction.onDone(() => {
                callbacks.done();
            });
        };
    }
    insertMany({ table, rows }) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const transaction = ObjectStore.createDedicatedTransaction();
            transaction.writeTransactionFlag();
            let index = 0;
            for (const item of rows) {
                const operation = new InsertOperation({ callBacks: callbacks, data: item, index, ObjectStore });
                transaction.enqueueOperation(operation);
                // transaction.enqueueOperation({operation:"add",index, data:item, ...callbacks})
            }
            transaction.onDone(() => {
                callbacks.done();
            });
            ObjectStore.addTransaction(transaction);
        };
    }
    update({ table, query }) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            if (query.hasIndex) {
                if (query.isParamsArray == false) {
                    const updateValues = query.updateValues;
                    const operation = new UpdateOperation({ callBacks: callbacks, data: updateValues });
                    operation.onDone(() => {
                        callbacks.done();
                    });
                    const transaction = ObjectStore.findOrCreateNotDedicatedTransaction();
                    transaction.writeTransactionFlag();
                    transaction.enqueueOperation(operation);
                    ObjectStore.processTransactionQueue();
                }
            }
        };
    }
    updateMany({ table, query }) {
        // Implement IndexedDB insert here
        return async (callbacks) => {
            const queryReader = CreateQueryReaderSelect(query);
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const transaction1 = ObjectStore.findOrCreateNotDedicatedTransaction();
            const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
            const updateValues = query.updateValues;
            const operation1 = new GetAllOperation({ callBacks: callbacks });
            operation1.onDone(async (result) => {
                let filteredRow = [];
                if (result.isOk) {
                    const rows = result.value.data;
                    const sqlObject = new SqlObject(TableSchema, queryReader);
                    filteredRow = await sqlObject.run(rows);
                    //const lastElement = filteredRow.pop()
                    const transaction2 = ObjectStore.findOrCreateNotDedicatedTransaction();
                    transaction2.writeTransactionFlag();
                    const allRequest = filteredRow.map((row) => transaction2.enqueueOperation(new UpdateOperation({ callBacks: callbacks, data: Object.assign(row, updateValues) })));
                    let a = Promise.all(allRequest);
                    ObjectStore.processTransactionQueue();
                    await a;
                }
                callbacks.done(filteredRow);
            });
            transaction1.enqueueOperation(operation1);
            ObjectStore.processTransactionQueue();
        };
    }
    select({ table, query }) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const queryReader = CreateQueryReaderSelect(query);
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
            const operation = new GetAllOperation({ callBacks: callbacks });
            operation.onDone(async (result) => {
                if (result.isOk) {
                    const rows = result.value.data;
                    const sqlObject = new SqlObject(TableSchema, queryReader);
                    const filteredRow = await sqlObject.run(rows);
                    if (filteredRow) {
                        callbacks.done(filteredRow);
                    }
                    else {
                        callbacks.notFound();
                    }
                    return;
                }
            });
            const transaction = ObjectStore.findOrCreateNotDedicatedTransaction();
            transaction.enqueueOperation(operation);
            ObjectStore.processTransactionQueue();
        };
    }
    selectMany({ table, query }) {
        // Implement IndexedDB select here
        return async (callbacks) => {
            const queryReader = CreateQueryReaderSelect(query);
            const ObjectStore = await databaseManager.getDb(this.databaseName)
                .executeOnObjectStore(table);
            const TableSchema = databaseManager.getTableSchema(this.databaseName, table);
            const transaction = ObjectStore.findOrCreateNotDedicatedTransaction();
            if (queryReader.hasNoCondition) {
                const operation = new GetAllOperation({ callBacks: callbacks });
                operation.onDone((result) => {
                    if (result.isOk) {
                        callbacks.onsuccess(result.value.data);
                    }
                    callbacks.done();
                });
                transaction.enqueueOperation(operation);
            }
            else {
                const operation = new GetAllOperation({ callBacks: callbacks });
                operation.onDone(async (result) => {
                    let filteredRow = [];
                    if (result.isOk) {
                        const rows = result.value.data;
                        const sqlObject = new SqlObject(TableSchema, queryReader);
                        filteredRow = await sqlObject.run(rows);
                        callbacks.onsuccess(filteredRow);
                        callbacks.done();
                    }
                });
                transaction.enqueueOperation(operation);
            }
            ObjectStore.processTransactionQueue();
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
