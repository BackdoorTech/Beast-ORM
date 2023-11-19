import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder.js";
import { IDatabaseSchema } from '../../BusinessLayer/_interface/interface.type.js';
export interface IReturnObject {
    onsuccess?: Function;
    onerror?: Function;
    done?: Function;
}
export interface IReturnTriggerObject {
    onsuccess?: Function;
    stream: Function;
    onerror?: Function;
    done?: Function;
}
type returnFunction = (returnObject: IReturnObject) => void;
type returnStreamTriggerFunction = (returnObject: IReturnTriggerObject) => void;
export interface IDatabaseStrategy {
    migrate(migrate: IMigrations): returnFunction;
    update(table: any, data: IQuery): returnFunction;
    updateMany(table: any, data: IQuery): returnFunction;
    insert(table: any, data: any): returnFunction;
    insertMany(table: any, data: any): returnFunction;
    delete(table: any, data: IQuery): returnFunction;
    deleteMany(table: any, data: IQuery): returnFunction;
    select(table: any, data: IQuery): returnFunction;
    selectMany(table: any, data: IQuery): returnFunction;
    prepare(migrate: IMigrations): returnFunction;
    addTrigger(table: any, data: any): returnStreamTriggerFunction;
    RemoveTrigger(table: any, data: any): returnFunction;
}
export type IMigrations = IDatabaseSchema;
export {};
