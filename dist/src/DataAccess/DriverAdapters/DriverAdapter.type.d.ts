import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder";
import { ITableSchema } from "../_interface/interface.type";
export interface IReturnObject {
    onsuccess?: Function;
    onerror?: Function;
    done?: Function;
}
type returnFunction = (returnObject: IReturnObject) => void;
export interface IDatabaseStrategy {
    migrate(migrate: IMigrations): returnFunction;
    update(table: any, data: IQuery): returnFunction;
    insert(table: any, data: any): returnFunction;
    delete(table: any, data: IQuery): returnFunction;
    select(table: any, data: IQuery): returnFunction;
    prepare(migrate: IMigrations): returnFunction;
}
export interface IMigrations {
    databaseName: string;
    type: 'indexedDB' | 'localStorage';
    version: number;
    webWorker?: boolean;
    table: ITableSchema[];
}
export {};
