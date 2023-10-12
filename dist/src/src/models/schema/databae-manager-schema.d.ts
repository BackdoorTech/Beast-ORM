import { DatabaseSchema as DatabaseSchemaInterface } from "../register-modal.interface.js";
import { DatabaseSchemaClass } from "./database-schema.js";
export declare class DatabaseManagerSchema {
    private static databases;
    static prepare(config: DatabaseSchemaInterface): Promise<void>;
    static getDb(databaseName: any): DatabaseSchemaClass;
}
