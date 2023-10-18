import { IDatabaseSchema } from "../DatabaseService.type.js";
export declare class IndexedDBManager {
    config: IDatabaseSchema;
    constructor(config: IDatabaseSchema);
    openDatabase(): Promise<IDBDatabase>;
    migrate(config: IDatabaseSchema): Promise<boolean>;
    private runMigrations;
    closeDatabase(db: any): void;
}
