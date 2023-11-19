import { IQuery } from "../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js";
import { IDatabaseStrategy, IMigrations, IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
export declare class IndexedDBWorkerStrategy implements IDatabaseStrategy {
    private myWorker;
    private Queue;
    constructor();
    addTrigger(table: any, data: any): (returnObject: IReturnObject) => void;
    RemoveTrigger(table: any, data: any): (returnObject: IReturnObject) => void;
    updateMany(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    insertMany(table: any, data: any): (returnObject: IReturnObject) => void;
    deleteMany(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    selectMany(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    update(table: any, data: IQuery): (returnObject: IReturnObject) => void;
    delete(table: any, data: any): (returnObject: IReturnObject) => void;
    openDatabase(): (callbacks: IReturnObject) => Promise<void>;
    insert(table: any, data: any): (callbacks: IReturnObject) => Promise<void>;
    select(table: any, key: any): (callbacks: IReturnObject) => Promise<void>;
    migrate(migrate: IMigrations): (callbacks: IReturnObject) => Promise<void>;
    prepare(migrate: IMigrations): (callbacks: IReturnObject) => Promise<void>;
}
