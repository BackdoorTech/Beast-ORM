import { Database } from './database.js';
import { DatabaseSchema } from '../../modelManager/schemaGenerator/schemaGenerator.type.js';
declare class ModelRegistration {
    databases: {
        [key: string]: Database;
    };
    register(DatabaseSchema: DatabaseSchema): void;
    getDatabase(databaseName: any): Database;
}
export declare const modelRegistration: ModelRegistration;
export {};
