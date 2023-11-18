import { Model } from '../../../Presentation/Api.js';
import { IDatabaseSchema } from '../../_interface/interface.type.js';
import { Database } from './database.js';
declare class ModelRegistration {
    databases: {
        [key: string]: Database;
    };
    register(DatabaseSchema: IDatabaseSchema, Models: typeof Model<any>[]): void;
    getDatabase(databaseName: any): Database;
}
export declare const modelRegistration: ModelRegistration;
export {};
