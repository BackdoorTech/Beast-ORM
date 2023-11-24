import { IReturnObject, IReturnSelectObject } from "../../../DriverAdapters/DriverAdapter.type.js";
import { ObjectStoreRequestResult } from "./ObjectStore.type";
interface selectOperationParams {
    data: Object;
    callBacks: IReturnSelectObject;
}
interface deleteOperationParams {
    callBacks: IReturnSelectObject;
}
interface operationParams {
    data: Object;
    callBacks: IReturnObject;
}
export declare class selectOperation implements selectOperationParams {
    data: Object;
    callBacks: Object;
    constructor(data: selectOperationParams);
    execute(request: IDBOpenDBRequest, operation: any): Promise<ObjectStoreRequestResult>;
}
export declare class insertOperationOperation implements operationParams {
    data: Object;
    callBacks: Object;
    constructor(data: operationParams);
    execute(request: IDBOpenDBRequest, operation: any): Promise<ObjectStoreRequestResult>;
}
export declare class UpdateOperation implements operationParams {
    data: Object;
    callBacks: Object;
    constructor(data: operationParams);
    execute(request: IDBOpenDBRequest, operation: any): Promise<ObjectStoreRequestResult>;
}
export declare class DeleteOperation implements operationParams {
    data: Object;
    callBacks: Object;
    operation: string;
    constructor(data: deleteOperationParams);
    execute(request: IDBOpenDBRequest, operation: any): Promise<ObjectStoreRequestResult>;
}
export declare class ClearAllOperation implements operationParams {
    data: Object;
    callBacks: Object;
    constructor(data: operationParams);
    execute(request: IDBOpenDBRequest, operation: any): Promise<ObjectStoreRequestResult>;
}
export declare class GetAllOperation implements operationParams {
    data: Object;
    callBacks: Object;
    constructor();
    execute(request: IDBOpenDBRequest, operation: any): Promise<ObjectStoreRequestResult>;
}
export interface IDatabaseOperation {
    execute(request: IDBOpenDBRequest): any;
}
export {};
