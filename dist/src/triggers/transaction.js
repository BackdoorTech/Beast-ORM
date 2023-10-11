import { taskHolder } from "../connection/taskHolder.js";
import { ModelAPIRequest } from "../models/model-manager.js";
import { uniqueGenerator } from "../utils.js";
export class transactionOnCommit {
    static prepare(model) {
        const TableSchema = model.getTableSchema();
        const DatabaseSchema = model.getDBSchema();
        const databaseName = DatabaseSchema.databaseName;
        const table = TableSchema.name;
        this.stores[databaseName] = {};
        this.stores[databaseName][table] = {};
    }
    static subscribe(model, callback) {
        const TableSchema = model.getTableSchema();
        const DatabaseSchema = model.getDBSchema();
        const databaseName = DatabaseSchema.databaseName;
        const table = TableSchema.name;
        const SubscriptionName = databaseName + table;
        const queryId = uniqueGenerator();
        let subscribe = false;
        this.stores[databaseName][table][queryId] = callback;
        if (!this.subscription[SubscriptionName]) {
            //
            const args = {
                type: 'transactionOnCommit',
                subscribe: true
            };
            ModelAPIRequest.obj(DatabaseSchema, TableSchema).trigger(args, SubscriptionName, async () => {
                subscribe = true;
                console.log({ SubscriptionName });
                taskHolder.updateFunction(SubscriptionName, 'callback', () => {
                    console.log("run call back");
                    for (const [requestId, callback] of Object.entries(this.stores[databaseName][table])) {
                        console.log("run");
                        callback();
                    }
                });
            });
        }
        return {
            queryId,
            subscribe,
            unsubscribe: () => {
                return new Promise((resolve, reject) => {
                    delete this.stores[databaseName][table][queryId];
                    if (Object.keys(this.stores[databaseName][table]).length == 0) {
                        ModelAPIRequest.obj(DatabaseSchema, TableSchema).trigger({ type: 'transactionOnCommit', subscribe: false }, SubscriptionName, async (data) => {
                            delete this.subscription[SubscriptionName];
                            taskHolder.finish(SubscriptionName);
                            resolve(data);
                        });
                    }
                    else {
                        resolve(true);
                    }
                });
            }
        };
    }
}
transactionOnCommit.stores = {};
transactionOnCommit.subscription = {};
