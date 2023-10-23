import { DatabaseService } from "./DatabaseService.js";
import { IDatabaseSchema } from "./DatabaseService.type.js";
declare class DatabaseManager {
    databases: {
        [databaseName: string]: DatabaseService;
    };
    migrate(config: IDatabaseSchema): Promise<void>;
    prepare(config: IDatabaseSchema): Promise<void>;
    getDb(databaseName: any): DatabaseService;
}
export declare const databaseManager: DatabaseManager;
export {};
