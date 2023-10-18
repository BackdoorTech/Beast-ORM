import { IDatabaseStrategy, IMigrations } from "../../../DriverAdapters/DriverAdapter.type.js";
export declare class IndexedDBStrategy extends IDatabaseStrategy {
    databaseName: any;
    constructor();
    openDatabase(): Promise<void>;
    insert(table: any, data: any): Promise<void>;
    select(table: any, key: any): Promise<void>;
    migrate(migrate: IMigrations): Promise<any>;
    prepare(migrate: IMigrations): Promise<any>;
}
