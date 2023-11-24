import { DBEventsTrigger } from "../../../../BusinessLayer/_interface/interface.type.js";
import { DatabaseConnector } from "./DatabaseConnector.js";
import { DatabaseTriggerService } from "./DatabaseTriggerService.js";
import { ObjectStore } from './ObjectStore.js';
export class DatabaseService {
    constructor(schema) {
        this.db = null;
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
        this.objectStore = {};
        this.executingTransaction = {};
        this.tigers = new DatabaseTriggerService();
        this.connect = async () => {
            this.db = await this.connector.openDatabase(this.schema);
            if (this.isSchemaHeathy() == false) {
                this.db.close();
                this.db.onclose = async () => {
                    let currentVersion = this.db.version;
                    currentVersion++;
                    const newSchemaVersion = this.schema;
                    newSchemaVersion.version = currentVersion;
                    this.db = await this.connector.openDatabase(newSchemaVersion);
                };
            }
        };
        this.transactionFinish = (TableName) => {
            delete this.executingTransaction[TableName];
            if (Object.keys(this.executingTransaction).length == 0) {
                // this.db.close()
                delete this.db;
            }
        };
        this.schema = schema;
        this.connector = new DatabaseConnector();
        for (let tableSchema of schema.table.concat(schema.middleTables)) {
            this.objectStore[tableSchema.name] = new ObjectStore(tableSchema);
            this.objectStore[tableSchema.name].transactionFinish = this.transactionFinish;
        }
    }
    isSchemaHeathy() {
        for (const table of this.schema.table) {
            const found = this.db.objectStoreNames.contains(table.name);
            if (!found) {
                return false;
            }
        }
        return true;
    }
    async migrate() {
        await this.connector.migrate(this.schema);
    }
    hasConnectionToDatabase() {
        return this.db;
    }
    async executeOnObjectStore(objectStoreName) {
        if (!this.hasConnectionToDatabase()) {
            await this.connect();
        }
        const objectStore = this.objectStore[objectStoreName];
        if (!objectStore.hasActiveTransaction()) {
            objectStore.setDbInstance(this.db);
        }
        this.executingTransaction[objectStoreName] = true;
        return objectStore;
    }
    runTrigger(TableName, hasWriteTransaction) {
        this.tigers.executeTriggers(DBEventsTrigger.onCompleteReadTransaction, TableName);
    }
    registerTrigger(tableName, data, callback) {
        this.tigers.subscribe(DBEventsTrigger.onCompleteReadTransaction, tableName, callback);
    }
    UnRegisterTrigger(tableName, subscriptionId, callback) {
        this.tigers.unsubscribe(DBEventsTrigger.onCompleteReadTransaction, tableName, subscriptionId, callback);
    }
}
