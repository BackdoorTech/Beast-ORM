import { ObjectStore } from "../../../DataAccess/DataSource/indexeDB/indexeDB/ObjectStore";
import { IReturnObject, IReturnSelectObject } from "../../../DataAccess/DriverAdapters/DriverAdapter.type";
export interface ISelectOperationParams {
    data: Object;
    callBacks: IReturnSelectObject;
}
export interface IInsertOperationParams {
    data: Object;
    callBacks: IReturnObject;
    index: number;
    ObjectStore: ObjectStore;
}
export interface IUpdateOperationParams {
    data: any;
    callBacks: IReturnObject;
}
export interface IGetAllOperationParams {
    callBacks: IReturnObject;
}
export declare const num: {
    new (): IDBIndex;
    prototype: IDBIndex;
};
export declare enum IIndexedDBOperations {
    getAll = "getAll",
    add = "add",
    put = "put",
    delete = "delete",
    clear = "clear"
}
