import { IDatabaseSchema } from "../../../../BusinessLayer/_interface/interface.type.js";
import { IData, IDataInsert, IDatabaseStrategy, IReturnObject, IReturnSelectObject, IReturnTriggerObject } from "../../../DriverAdapters/DriverAdapter.type.js";
export declare class IndexedDBWorkerStrategy implements IDatabaseStrategy {
    databaseName: string;
    tableName: string;
    private myWorker;
    callbacks: {
        [key: string]: Object;
    };
    constructor(databaseName: string);
    static handler(instance: IndexedDBWorkerStrategy, callbacks: IReturnObject, data: any, methodName: any): void;
    update(data: IData): (returnObject: IReturnObject) => void;
    updateMany(data: IData): (returnObject: IReturnObject) => void;
    insert(data: IDataInsert): (returnObject: IReturnObject) => void;
    insertMany(data: IDataInsert): (returnObject: IReturnObject) => void;
    delete(data: IData): (returnObject: IReturnObject) => void;
    deleteMany(data: IData): (returnObject: IReturnObject) => void;
    select(data: IData): (returnObject: IReturnSelectObject) => void;
    selectMany(data: IData): (returnObject: IReturnObject) => void;
    migrate(migrate: IDatabaseSchema): (returnObject: IReturnObject) => void;
    prepare(migrate: IDatabaseSchema): (returnObject: IReturnObject) => void;
    RemoveTrigger(data: any): (returnObject: IReturnObject) => void;
    addTrigger(data: any): (returnObject: IReturnTriggerObject) => void;
}
