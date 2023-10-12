import { Database } from "./database.js";
// inspire by https://github.com/hc-oss/use-indexeddb
export class DatabaseManager {
    static async prepare(config) {
        this.databases[config.databaseName] = new Database({ config });
        await this.databases[config.databaseName].migrate();
    }
    static getDb(databaseName) {
        return this.databases[databaseName];
    }
}
DatabaseManager.databases = {};
