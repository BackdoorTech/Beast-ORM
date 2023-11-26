import { IData, IDataInsert, IDatabaseStrategy, IMigrations, IReturnObject, IReturnSelectObject, IReturnTriggerObject, ITriggerParam } from "../../../DriverAdapters/DriverAdapter.type.js";
export declare class IndexedDBStrategy implements IDatabaseStrategy {
    databaseName: string;
    tableName: string;
    constructor(databaseName: string);
    addTrigger({ table, data }: ITriggerParam): (returnObject: IReturnTriggerObject) => void;
    RemoveTrigger({ table, data }: ITriggerParam): (returnObject: IReturnTriggerObject) => void;
    openDatabase(): (callbacks: IReturnObject) => Promise<void>;
    delete({ table, query }: IData): (callbacks: IReturnObject) => Promise<void>;
    deleteMany({ table, query }: IData): (returnObject: IReturnObject) => void;
    insert({ table, rows }: IDataInsert): (callbacks: IReturnObject) => Promise<void>;
    insertMany({ table, rows }: IDataInsert): (returnObject: IReturnObject) => void;
    update({ table, query }: IData): (callbacks: IReturnObject) => Promise<void>;
    updateMany({ table, query }: IData): (returnObject: IReturnObject) => void;
    select({ table, query }: IData): (callbacks: IReturnSelectObject) => Promise<void>;
    selectMany({ table, query }: IData): (callbacks: IReturnObject) => Promise<void>;
    migrate(migrate: IMigrations): ({ onerror, onsuccess }: IReturnObject) => Promise<void>;
    prepare(migrate: IMigrations): ({ onerror, onsuccess, done }: IReturnObject) => Promise<void>;
}
