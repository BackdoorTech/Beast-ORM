import { IDatabaseSchema } from "./DatabaseService.type.js";
export declare class DatabaseConnector {
    openDatabase(config: IDatabaseSchema): Promise<IDBDatabase>;
    migrate(config: IDatabaseSchema): Promise<boolean>;
    private runMigrations;
    closeDatabase(db: any): void;
}
