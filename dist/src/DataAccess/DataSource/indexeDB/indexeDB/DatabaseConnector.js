import { connectionManagerHelper } from "./resource/connectionManagerHelper.js";
export class DatabaseConnector {
    openDatabase(config) {
        return new Promise((resolve, reject) => {
            const idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                const request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = () => {
                    resolve(request.result);
                };
                request.onerror = (e) => {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = async (e) => {
                    const db = e.target.result;
                    await this.runMigrations(db, config);
                    db.onclose = async () => {
                        resolve(await this.openDatabase(config));
                    };
                };
                request.onblocked = async (e) => {
                    reject(e.target.error.name);
                };
            }
            else {
                reject("IDBDatabase not supported inside webworker");
            }
        });
    }
    migrate(config) {
        return new Promise((resolve, reject) => {
            const idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                const request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = () => {
                    resolve(false);
                };
                request.onerror = (e) => {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = async (e) => {
                    const db = e.target.result;
                    await this.runMigrations(db, config);
                    db.close();
                    resolve(true);
                };
            }
            else {
                reject("Failed to connect");
            }
        });
    }
    async runMigrations(db, config) {
        for (const storeSchema of config.table.concat(config.middleTables)) {
            if (!connectionManagerHelper.storeExist(db, storeSchema.name)) {
                const ObjectStore = connectionManagerHelper.createObjectStore(db, storeSchema.id, storeSchema.name);
                for (const FieldSchema of storeSchema.fields) {
                    connectionManagerHelper.createColumn(ObjectStore, FieldSchema);
                }
            }
        }
    }
    closeDatabase(db) {
        db.close();
    }
}
