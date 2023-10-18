import { DatabaseService } from "./DatabaseService.js";
class DatabaseManager {
    constructor() {
        this.databases = {};
    }
    async prepare(config) {
        this.databases[config.databaseName] = new DatabaseService(config);
        await this.databases[config.databaseName].migrate();
    }
    getDb(databaseName) {
        return this.databases[databaseName];
    }
}
export const databaseManager = new DatabaseManager();
