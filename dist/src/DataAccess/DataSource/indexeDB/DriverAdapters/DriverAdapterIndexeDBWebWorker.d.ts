import { IQuery } from "../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js";
import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
export declare class IndexedDBWorkerStrategy implements IDatabaseStrategy {
    private myWorker;
    private Queue;
    constructor();
    update(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    delete(table: any, data: any): (returnObject: IReturnObject) => void;
    openDatabase(): (callbacks: IReturnObject) => Promise<void>;
    insert(table: any, data: any): (callbacks: IReturnObject) => Promise<void>;
    select(table: any, key: any): (callbacks: IReturnObject) => Promise<void>;
    migrate(migrate: IMigrations): (callbacks: IReturnObject) => Promise<void>;
    prepare(migrate: IMigrations): (callbacks: IReturnObject) => Promise<void>;
}
