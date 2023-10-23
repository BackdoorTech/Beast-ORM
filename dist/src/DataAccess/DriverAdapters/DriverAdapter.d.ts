import { IDatabaseStrategy, IMigrations } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js';
export declare class DriverAdapter implements IDatabaseStrategy {
    strategy: IDatabaseStrategy;
    constructor(strategy: any);
    prepare(migrate: IMigrations): (returnObject: import("./DriverAdapter.type.js").IReturnObject) => void;
    migrate(migration: IMigrations): (returnObject: import("./DriverAdapter.type.js").IReturnObject) => void;
    insert(table: any, data: any): (returnObject: import("./DriverAdapter.type.js").IReturnObject) => void;
    select(table: any, data: any): (returnObject: import("./DriverAdapter.type.js").IReturnObject) => void;
}
export declare function AdapterFactory(databaseName: string): IndexedDBStrategy;
