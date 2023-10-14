import { Database } from './database.js';
class ModelRegistration {
    constructor() {
        this.databases = {};
    }
    register(DatabaseSchema) {
        const database = new Database(DatabaseSchema);
        const databaseName = DatabaseSchema.databaseName;
        this.databases[databaseName] = database;
    }
    getDatabase(databaseName) {
        return this.databases[databaseName];
    }
}
export const modelRegistration = new ModelRegistration();
