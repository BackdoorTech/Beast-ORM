import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.js";
import { DatabaseService } from "./DatabaseService.js";
declare class DatabaseManager {
    databases: {
        [databaseName: string]: DatabaseService;
    };
    migrate(config: IDatabaseSchema): Promise<void>;
    prepare(config: IDatabaseSchema): Promise<void>;
    getDb(databaseName: any): DatabaseService;
    getTableSchema(databaseName: any, tableName: any): import("../../../../BusinessLayer/_interface/interface.js").ITableSchema;
}
export declare const databaseManager: DatabaseManager;
export {};
