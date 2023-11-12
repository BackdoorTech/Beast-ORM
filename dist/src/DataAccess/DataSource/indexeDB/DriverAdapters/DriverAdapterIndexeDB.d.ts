import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { IQuery } from "../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js";
export declare class IndexedDBStrategy implements IDatabaseStrategy {
    databaseName: string;
    tableName: string;
    constructor(databaseName: string);
    openDatabase(): (callbacks: IReturnObject) => Promise<void>;
    delete(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    deleteMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void;
    insert(table: any, data: any[]): (callbacks: IReturnObject) => Promise<void>;
    insertMany(table: any, data: any): (returnObject: IReturnObject) => void;
    update(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    updateMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void;
    select(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    selectMany(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    migrate(migrate: IMigrations): ({ onerror, onsuccess }: IReturnObject) => Promise<void>;
    prepare(migrate: IMigrations): ({ onerror, onsuccess, done }: IReturnObject) => Promise<void>;
}
