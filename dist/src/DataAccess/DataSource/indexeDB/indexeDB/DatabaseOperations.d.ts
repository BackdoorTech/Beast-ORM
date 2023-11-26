import { IGetAllOperationParams, IIndexedDBOperations, IInsertOperationParams, ISelectOperationParams, IUpdateOperationParams } from "../../../../BusinessLayer/_interface/DataAccess/interface.type.js";
import { Either } from "../../../../Utility/Either/index.js";
import { IReturnObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { IOperationResult } from "./ObjectStore.type";
export declare class DatabaseOperation {
    private finishOperationCallback;
    private _result;
    onDone(fn: (result: Either<IOperationResult, any>) => void): void;
    runDoneCallBack(result: Either<IOperationResult, any>): void;
}
export declare class SelectOperation extends DatabaseOperation {
    data: any;
    private callBacks;
    isProcessing: boolean;
    private result;
    private index;
    operation: IIndexedDBOperations;
    constructor(data: ISelectOperationParams);
    execute(request: IDBRequest<any[]>): Promise<IOperationResult>;
}
export declare class InsertOperation extends DatabaseOperation {
    isProcessing: boolean;
    private result;
    data: any;
    private callBacks;
    operation: IIndexedDBOperations;
    index: number;
    constructor(data: IInsertOperationParams);
    private proceedData;
    execute(request: IDBRequest<IDBValidKey>): Promise<IOperationResult>;
}
export declare class UpdateOperation extends DatabaseOperation {
    isProcessing: boolean;
    private result;
    data: any;
    private callBacks;
    operation: IIndexedDBOperations;
    constructor(data: IUpdateOperationParams);
    execute(request: IDBRequest<IDBValidKey>): Promise<IOperationResult>;
}
interface IDeleteOperationParams {
    /**
     * @description primaryKey
     */
    pk: number | string;
    callBacks: IReturnObject;
}
export declare class DeleteOperation extends DatabaseOperation {
    isProcessing: boolean;
    private result;
    data: any;
    pk: string | number;
    private callBacks;
    operation: IIndexedDBOperations;
    constructor(data: IDeleteOperationParams);
    execute(request: IDBRequest<undefined>): Promise<IOperationResult>;
}
interface ClearAllOperationParams {
    callBacks: IReturnObject;
}
export declare class ClearAllOperation extends DatabaseOperation {
    isProcessing: boolean;
    private result;
    private callBacks;
    operation: IIndexedDBOperations;
    data: any;
    constructor(data: ClearAllOperationParams);
    execute(request: IDBRequest<undefined>): Promise<IOperationResult>;
}
export declare class GetAllOperation extends DatabaseOperation {
    isProcessing: boolean;
    private result;
    data: any;
    private callBacks;
    operation: IIndexedDBOperations;
    constructor(data: IGetAllOperationParams);
    execute(request: IDBRequest<any[]>): Promise<IOperationResult>;
}
export type IAllDatabaseOperation = GetAllOperation | ClearAllOperation | DeleteOperation | UpdateOperation | InsertOperation | SelectOperation;
export {};
