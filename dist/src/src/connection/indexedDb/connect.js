// inspire by https://github.com/hc-oss/use-indexeddb
export class IndexedDBConnector {
    static connect(config) {
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
                    await this.migrate(config);
                    return await this.connect(config);
                };
                // request.onblocked = async (e: any) => {
                //   reject(e.target.error.name);
                // }
            }
            else {
                reject("IDBDatabase not supported inside webworker");
            }
        });
    }
    static migrate(config) {
        return new Promise((resolve, reject) => {
            const idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                const request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = () => {
                    // request.result.close()
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
    static async runMigrations(db, config) {
        await config.stores.forEach(async (storeSchema) => {
            if (!db.objectStoreNames.contains(storeSchema.name)) {
                const ObjectStore = db.createObjectStore(storeSchema.name, storeSchema.id);
                storeSchema.fields.forEach(c => {
                    ObjectStore.createIndex(c.name, c.keyPath, c.options);
                });
            }
        });
    }
}
