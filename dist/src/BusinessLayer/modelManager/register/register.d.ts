import { IDatabaseSchema } from '../../_interface/interface.js';
import { Database } from './database.js';
declare class ModelRegistration {
    databases: {
        [key: string]: Database;
    };
    register(DatabaseSchema: IDatabaseSchema): void;
    getDatabase(databaseName: any): Database;
}
export declare const modelRegistration: ModelRegistration;
export {};
