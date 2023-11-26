import { IDatabaseStrategy, IMigrations, IReturnObject, IReturnTriggerObject, ITriggerParam } from "./DriverAdapter.type.js";
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexedDB.js';
export declare class DriverAdapter implements IDatabaseStrategy {
    strategy: IDatabaseStrategy;
    constructor(strategy: any);
    addTrigger(data: ITriggerParam): (returnObject: IReturnTriggerObject) => void;
    RemoveTrigger(data: ITriggerParam): (returnObject: IReturnObject) => void;
    insertMany(data: any): (returnObject: IReturnObject) => void;
    deleteMany(data: any): (returnObject: IReturnObject) => void;
    selectMany(data: any): (returnObject: IReturnObject) => void;
    updateMany(data: any): (returnObject: IReturnObject) => void;
    update(data: any): (returnObject: IReturnObject) => void;
    delete(data: any): (returnObject: IReturnObject) => void;
    prepare(migrate: IMigrations): (returnObject: IReturnObject) => void;
    migrate(migration: IMigrations): (returnObject: IReturnObject) => void;
    insert(data: any): (returnObject: IReturnObject) => void;
    select(data: any): (returnObject: import("./DriverAdapter.type.js").IReturnSelectObject) => void;
}
export declare function setStrategy(strategy: any): void;
export declare function AdapterFactory(databaseName: string): IndexedDBStrategy;
