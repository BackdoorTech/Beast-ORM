import { ObjectStore } from './objectStore.js';
import { IndexedDBConnector } from './connect.js';
export class Database {
    constructor({ config }) {
        this.name = '';
        this.version = '';
        this.objectStore = {};
        this.executingTransaction = {};
        this.storeUsingDbInstance = {};
        this.transactionFinish = (TableName) => {
            delete this.storeUsingDbInstance[TableName];
            delete this.storeUsingDbInstance[TableName];
            if (Object.keys(this.storeUsingDbInstance).length == 0) {
                this.dbInstance.close();
                delete this.dbInstance;
            }
        };
        this.config = config;
        this.name = this.config.databaseName;
        for (let store of config.stores) {
            this.objectStore[store.name] = new ObjectStore({ store });
            this.objectStore[store.name].transactionFinish = this.transactionFinish;
        }
    }
    async getDatabaseConnection() {
        if (!this.dbInstance) {
            this.dbInstance = await IndexedDBConnector.connect(this.config);
        }
        return this.dbInstance;
    }
    async getOrCreateTransaction({ TableName, queryId }, mode, callback) {
        const Database = await this.getDatabaseConnection();
        this.storeUsingDbInstance[TableName] = true;
        this.objectStore[TableName].getOrCreateTransaction({ Database, queryId }, "readonly", callback);
    }
    getObjectStore(TableName) {
        return this.objectStore[TableName];
    }
    async migrate() {
        return await IndexedDBConnector.migrate(this.config);
    }
}
