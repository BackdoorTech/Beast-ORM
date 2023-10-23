import { DatabaseService } from "./DatabaseService.js";
class DatabaseManager {
    constructor() {
        this.databases = {};
    }
    async migrate(config) {
        console.log("migrate db");
        await this.databases[config.databaseName].migrate();
    }
    async prepare(config) {
        console.log("create db connection");
        this.databases[config.databaseName] = new DatabaseService(config);
    }
    getDb(databaseName) {
        return this.databases[databaseName];
    }
}
export const databaseManager = new DatabaseManager();
