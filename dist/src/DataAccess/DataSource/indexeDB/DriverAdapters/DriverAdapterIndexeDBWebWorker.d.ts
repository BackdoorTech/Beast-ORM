import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
export declare class IndexedDBStrategy implements IDatabaseStrategy {
    openDatabase(): (callbacks: IReturnObject) => Promise<void>;
    insert(table: any, data: any): (callbacks: IReturnObject) => Promise<void>;
    select(table: any, key: any): (callbacks: IReturnObject) => Promise<void>;
    migrate(migrate: IMigrations): ({ onerror, onsuccess }: IReturnObject) => Promise<void>;
    prepare(migrate: IMigrations): ({ onerror, onsuccess, done }: IReturnObject) => Promise<void>;
}
