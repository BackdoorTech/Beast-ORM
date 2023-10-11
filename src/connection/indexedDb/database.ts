
import { DatabaseSchema } from '../../models/register-modal.interface'
import { ObjectStore } from './objectStore.js'
import { IndexedDBConnector } from './connect.js'

export class Database {

    name = ''
    version = ''
    objectStore: {[storeName: string]: ObjectStore }  = {}
    dbInstance: IDBDatabase
    executingTransaction : {[ key: string]: boolean } = {}
    storeUsingDbInstance : {[ key: string]: boolean } = {}
    config: DatabaseSchema

    constructor({config}:{config:DatabaseSchema}) {

        this.config = config
        this.name = this.config.databaseName
        for (let store of config.stores) {
            this.objectStore[store.name] = new ObjectStore({store})
            this.objectStore[store.name].transactionFinish = this.transactionFinish
        }

    }

    async getDatabaseConnection() {

        if(!this.dbInstance) {
            this.dbInstance = await IndexedDBConnector.connect(this.config)
        }

        return this.dbInstance 
    }

    async getOrCreateTransaction({TableName, queryId}, mode: IDBTransactionMode, callback) {

        const Database = await this.getDatabaseConnection()

        this.storeUsingDbInstance[TableName] = true
        this.objectStore[TableName].getOrCreateTransaction({Database, queryId}, mode, callback)
     
    }

    getObjectStore(TableName) {
        return this.objectStore[TableName]
    }


    transactionFinish = (TableName) => {
        delete this.storeUsingDbInstance[TableName]

        delete this.storeUsingDbInstance[TableName]
        if(Object.keys(this.storeUsingDbInstance).length == 0) {
          this.dbInstance.close()
           delete this.dbInstance;
        }
    }

    async migrate() {
        return await IndexedDBConnector.migrate(this.config)
    }


}