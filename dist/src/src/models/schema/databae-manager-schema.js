import { DatabaseSchemaClass } from "./database-schema.js";
export class DatabaseManagerSchema {
    static async prepare(config) {
        if (this.databases[config.databaseName]) {
            throw ('Database name already exist. Force create');
        }
        this.databases[config.databaseName] = new DatabaseSchemaClass({ config });
    }
    static getDb(databaseName) {
        return this.databases[databaseName];
    }
}
DatabaseManagerSchema.databases = {};
