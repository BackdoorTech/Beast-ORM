import { IModel } from "./Api.type.js";
import { ICallBackReactiveList, ITableSchema } from "../BusinessLayer/_interface/interface.type.js";
import { APIResponse } from "../Utility/Either/APIResponse.js";
import { FormValidationError } from "../BusinessLayer/validation/fields/allFields.type.js";
import { BulkDataUniqueFieldError, ItemNotFound } from "../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
import { TransactionAbortion } from "../DataAccess/_interface/interface.type.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    getModel(): typeof Model;
    save(params: any): Promise<APIResponse<number, FormValidationError>>;
    getPrimaryKeyValue(): number | string;
    setPrimaryKey(key: number | string): void;
    delete(): Promise<APIResponse<number, FormValidationError>>;
    get(): Promise<APIResponse<Model, FormValidationError>>;
    static getTableSchema(): ITableSchema;
    static getModel(): typeof Model<any>;
    static getModelSchema(): typeof Model<any>;
    static get<T>(value: Object): Promise<APIResponse<T, FormValidationError | ItemNotFound>>;
    static all<T>(): Promise<APIResponse<T[], FormValidationError>>;
    static deleteAll(): Promise<APIResponse<number, FormValidationError>>;
    static create<T>(params: any): Promise<APIResponse<T, FormValidationError | TransactionAbortion>>;
    static filter<T>(value: Object): {
        execute: () => Promise<APIResponse<T[], FormValidationError>>;
        update: (params: any) => Promise<APIResponse<number, FormValidationError>>;
        delete: () => Promise<APIResponse<number, FormValidationError>>;
    };
    static magic(): import("./Api.js").Model<unknown>;
    static transactionOnCommit(fn: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
    static ReactiveList(callback: ICallBackReactiveList): {
        readonly value: any;
        readonly subscribe: {
            dispatchUID: string;
            disconnect: () => void;
        };
        unsubscribe: () => Promise<void>;
        setUpdateUi(func: any): void;
    };
    static getOrCreate<T>(params: any): Promise<APIResponse<{
        created: T;
        found: T;
    }, FormValidationError | BulkDataUniqueFieldError | TransactionAbortion>>;
}
