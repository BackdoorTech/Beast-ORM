import { taskHolder } from "../connection/taskHolder.js";
import { ModelAPIRequest } from "../models/model-manager.js"
import { Model } from "../models/model.js";
import { uniqueGenerator } from "../utils.js";

export  class transactionOnCommit {
    
    static stores: {[dbName: string]: {[store: string]: {[requestId: string]:  Function } }} = {}
    static subscription : {[SubscriptionName: string]: boolean} = {}

    static prepare(model: typeof Model) {
        const TableSchema = model.getTableSchema()
        const DatabaseSchema = model.getDBSchema()
        const databaseName = DatabaseSchema.databaseName
        const table = TableSchema.name
        this.stores[databaseName] = {}
        this.stores[databaseName][table] = {}
    }

    static subscribe(model: typeof Model, callback) {
        const TableSchema = model.getTableSchema()
        const DatabaseSchema = model.getDBSchema()
        const databaseName = DatabaseSchema.databaseName
        const table = TableSchema.name
        const SubscriptionName = databaseName + table
        const queryId = uniqueGenerator();
        let subscribe = false
        this.stores[databaseName][table][queryId]  = callback
        
        if(!this.subscription[SubscriptionName]) {
            //
            const args = {
                type: 'transactionOnCommit',
                subscribe: true
            }

            ModelAPIRequest.obj(DatabaseSchema, TableSchema).trigger(args, SubscriptionName, async () => {
                subscribe = true

                taskHolder.updateFunction(SubscriptionName, 'callback', () => {
                    for(const [requestId, callback] of Object.entries(this.stores[databaseName][table])) {
                        callback()
                    }
                })
            })

        }

        return {
            queryId,
            subscribe,
            unsubscribe: () => {
                return new Promise((resolve, reject) => {

                    delete this.stores[databaseName][table][queryId]
                    if(Object.keys(this.stores[databaseName][table]).length == 0) {
                        ModelAPIRequest.obj(DatabaseSchema, TableSchema).trigger(
                            { type: 'transactionOnCommit', subscribe: false }, 
                            SubscriptionName, async (data) => {
                                delete this.subscription[SubscriptionName];
                                taskHolder.finish(SubscriptionName)
                                resolve(data)
                            }
                        )
                    } else {
                        resolve(true)
                    }
                })
                
            }
        }
    }
}