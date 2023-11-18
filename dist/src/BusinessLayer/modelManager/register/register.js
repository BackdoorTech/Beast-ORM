import { Database } from './database.js';
class ModelRegistration {
    constructor() {
        this.databases = {};
    }
    register(DatabaseSchema, Models) {
        const database = new Database(DatabaseSchema, Models);
        const databaseName = DatabaseSchema.databaseName;
        this.databases[databaseName] = database;
    }
    getDatabase(databaseName) {
        return this.databases[databaseName];
    }
}
export const modelRegistration = new ModelRegistration();
