import { IDatabaseStrategy, IMigrations, IReturnObject, IReturnSelectObject, IReturnTriggerObject } from "../../../../DriverAdapters/DriverAdapter.type.js";
import { IQuery } from "../../../../../BusinessLayer/_interface/Apresentation/queryBuilder.js";
export declare class IndexedDBWorkerStrategy implements IDatabaseStrategy {
    databaseName: string;
    callbacks: {
        [key: string]: Object;
    };
    myWorker: Worker;
    constructor(databaseName: string);
    addTrigger(table: any, data: any): (returnObject: IReturnTriggerObject) => void;
    RemoveTrigger(table: any, subscriptionId: any): (returnObject: IReturnTriggerObject) => void;
    openDatabase(): (callbacks: IReturnObject) => Promise<void>;
    delete(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    deleteMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void;
    insert(table: any, rows: any[]): (callbacks: IReturnObject) => Promise<void>;
    insertMany(table: any, rows: any): (returnObject: IReturnObject) => void;
    update(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    updateMany(table: any, Query: IQuery): (returnObject: IReturnObject) => void;
    select(table: any, Query: IQuery): (callbacks: IReturnSelectObject) => Promise<void>;
    selectMany(table: any, Query: IQuery): (callbacks: IReturnObject) => Promise<void>;
    migrate(migrate: IMigrations): ({ onerror, onsuccess }: IReturnObject) => Promise<void>;
    prepare(migrate: IMigrations): ({ onerror, onsuccess, done }: IReturnObject) => Promise<void>;
}
