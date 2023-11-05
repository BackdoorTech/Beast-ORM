import { IDatabaseStrategy, IMigrations, IReturnObject } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB.js';
import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder.js";
export declare class DriverAdapter implements IDatabaseStrategy {
    strategy: IDatabaseStrategy;
    constructor(strategy: any);
    update(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    delete(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    prepare(migrate: IMigrations): (returnObject: IReturnObject) => void;
    migrate(migration: IMigrations): (returnObject: IReturnObject) => void;
    insert(table: any, data: any): (returnObject: IReturnObject) => void;
    select(table: any, data: any): (returnObject: IReturnObject) => void;
}
export declare function AdapterFactory(databaseName: string): IndexedDBStrategy;
