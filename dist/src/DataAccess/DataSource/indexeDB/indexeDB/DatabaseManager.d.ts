import { DatabaseService } from "./DatabaseService.js";
import { IDatabaseSchema } from "./DatabaseService.type.js";
declare class DatabaseManager {
    databases: {
        [databaseName: string]: DatabaseService;
    };
    prepare(config: IDatabaseSchema): Promise<void>;
    getDb(databaseName: any): DatabaseService;
}
export declare const databaseManager: DatabaseManager;
export {};
