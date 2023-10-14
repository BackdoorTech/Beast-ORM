import { IDatabaseStrategy } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js';
export declare class DriverAdapter implements IDatabaseStrategy {
    strategy: IDatabaseStrategy;
    constructor(strategy: any);
    migrate(): Promise<void>;
    insert(table: any, data: any): Promise<void>;
    select(table: any, key: any): Promise<void>;
}
export declare function AdapterFactory(): IndexedDBStrategy;
