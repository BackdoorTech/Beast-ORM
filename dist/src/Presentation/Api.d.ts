import { IModel } from "./Api.type.js";
import { ICallBackReactiveList, ITableSchema } from "../BusinessLayer/_interface/interface.type.js";
import { FormValidationError } from "../BusinessLayer/validation/fields/allFields.type.js";
import { BulkDataUniqueFieldError, ItemNotFound } from "../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
import { TransactionAbortion } from "../DataAccess/_interface/interface.type.js";
import { APIResponse } from "../Utility/Either/APIresponse.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    getModel(): typeof Model;
    save(params: any): Promise<APIResponse<number, FormValidationError>>;
    getPrimaryKeyValue(): number | string;
    setPrimaryKey(key: number | string): void;
    delete(): Promise<APIResponse<number, FormValidationError>>;
    get<Model>(): Promise<APIResponse<Model, FormValidationError>>;
    static getTableSchema(): ITableSchema;
    static getModel(): typeof Model<any>;
    static getModelSchema<T>(): typeof Model<T>;
    static get<T>(value: Object): Promise<APIResponse<T, FormValidationError | ItemNotFound>>;
    static all<T>(): Promise<APIResponse<T[], FormValidationError>>;
    static deleteAll(): Promise<APIResponse<number, FormValidationError>>;
    static create<T>(params: any): Promise<APIResponse<T, FormValidationError | TransactionAbortion>>;
    static filter<T>(value: Object): {
        execute: () => Promise<APIResponse<T[], FormValidationError>>;
        update: (params: any) => Promise<APIResponse<number, FormValidationError>>;
        delete: () => Promise<APIResponse<number, FormValidationError>>;
    };
    static transactionOnCommit(fn: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
    static ReactiveList<I>(callback: ICallBackReactiveList<I>): {
        readonly value: I[];
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
    static updateOrCreate<T>(params: any): Promise<APIResponse<{
        updated: T;
        created: T;
    }, FormValidationError | BulkDataUniqueFieldError | TransactionAbortion>>;
}
export declare const $B: <I, S>(model: S) => {
    get(value: Object): Promise<APIResponse<I, FormValidationError | ItemNotFound>>;
    all(): Promise<APIResponse<I[], FormValidationError>>;
    deleteAll(): Promise<APIResponse<number, FormValidationError>>;
    create(params: any): Promise<APIResponse<I, FormValidationError | TransactionAbortion>>;
    filter(value: Object): {
        execute: () => Promise<APIResponse<I[], FormValidationError>>;
        update: (params: any) => Promise<APIResponse<number, FormValidationError>>;
        delete: () => Promise<APIResponse<number, FormValidationError>>;
    };
    transactionOnCommit(fn: Function): {
        dispatchUID: string;
        disconnect: () => void;
    };
    ReactiveList(callback: ICallBackReactiveList<I>): {
        readonly value: I[];
        readonly subscribe: {
            dispatchUID: string;
            disconnect: () => void;
        };
        unsubscribe: () => Promise<void>;
        setUpdateUi(func: any): void;
    };
    getOrCreate(params: any): Promise<APIResponse<{
        created: I;
        found: I;
    }, FormValidationError | TransactionAbortion | BulkDataUniqueFieldError>>;
    updateOrCreate(params: any): Promise<APIResponse<{
        updated: I;
        created: I;
    }, FormValidationError | TransactionAbortion | BulkDataUniqueFieldError>>;
};
export declare class KeyValueModel {
    constructor();
    static save(data?: Object): void;
    static get(): Object;
    static getTableSchema(): ITableSchema;
    static clear(): void;
    static clearComponent(): void;
    static clearStorage(): void;
    static key(): string;
}
