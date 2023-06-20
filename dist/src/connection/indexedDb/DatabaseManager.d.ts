import { DatabaseSchema } from "../../models/register-modal.interface.js";
import { Database } from "./database.js";
export declare class DatabaseManager {
    static databases: {
        [databaseName: string]: Database;
    };
    static prepare(config: DatabaseSchema): Promise<void>;
    static getDb(databaseName: any): Database;
}
