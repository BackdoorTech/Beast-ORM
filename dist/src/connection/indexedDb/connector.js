// inspire by https://github.com/hc-oss/use-indexeddb
export class IndexedDBConnection {
    constructor() { }
    connect(config) {
        return new Promise((resolve, reject) => {
            const idbInstance = typeof window !== "undefined" ? window.indexedDB : null;
            if (idbInstance) {
                const request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = () => {
                    resolve(request.result);
                };
                request.onerror = (e) => {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = async (e) => {
                    throw ('need to migrate first');
                };
            }
            else {
                reject("Failed to connect");
            }
        });
    }
    migrate(config) {
        return new Promise((resolve, reject) => {
            const idbInstance = typeof window !== "undefined" ? window.indexedDB : null;
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
        console.log('running migrations ==', false);
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
