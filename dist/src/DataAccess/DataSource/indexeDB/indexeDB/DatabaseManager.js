import { DatabaseService } from "./DatabaseService.js";
class DatabaseManager {
    constructor() {
        this.databases = {};
    }
    async migrate(config) {
        await this.databases[config.databaseName].migrate();
    }
    async prepare(config) {
        this.databases[config.databaseName] = new DatabaseService(config);
    }
    getDb(databaseName) {
        return this.databases[databaseName];
    }
    getTableSchema(databaseName, tableName) {
        return this.databases[databaseName].objectStore[tableName].schema;
    }
}
export const databaseManager = new DatabaseManager();
