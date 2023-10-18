import { IDatabaseStrategy, IMigrations } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js';
export declare class DriverAdapter implements IDatabaseStrategy {
    strategy: IDatabaseStrategy;
    constructor(strategy: any);
    prepare(migrate: IMigrations): Promise<any>;
    migrate(migration: IMigrations): Promise<void>;
    insert(table: any, data: any): Promise<(returnObject: import("./DriverAdapter.type.js").IReturnObject) => void>;
    select(table: any, key: any): Promise<(returnObject: import("./DriverAdapter.type.js").IReturnObject) => void>;
}
export declare function AdapterFactory(): IndexedDBStrategy;
