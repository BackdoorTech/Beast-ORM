import { ICallBackReactiveList, ITableSchema } from "../../BusinessLayer/_interface/interface.type.js";
import { ItemNotFound } from "../../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
import { FormValidationError } from "../../BusinessLayer/validation/fields/allFields.type.js";
import { Either } from "../../Utility/Either/APIResponse";
import { Model } from "../Api.js";
import { IModel } from "../Api.type.js";
export declare class PublicMethodStatic {
    static getTableSchema(): ITableSchema;
    static getModel(): typeof Model;
    static getModelSchema(): any;
    static get<T>(value: Object): Promise<Either<T, FormValidationError | ItemNotFound>>;
    static all<T>(): Promise<Either<T[], FormValidationError>>;
    static deleteAll(): Promise<Either<number, FormValidationError>>;
    static create<T>(params: any): Promise<Either<T, FormValidationError>>;
    static filter<T>(value: Object): {
        execute: () => Promise<Either<T[], FormValidationError>>;
        update: (params: any) => Promise<Either<number, FormValidationError>>;
        delete: () => Promise<Either<number, FormValidationError>>;
    };
    static magic(): PublicMethodStatic;
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
}
export declare class PublicMethod implements IModel<any> {
    save(params?: any): Promise<Either<number, FormValidationError>>;
    delete(): Promise<Either<number, FormValidationError>>;
    get(): Promise<Either<any, FormValidationError>>;
}
export declare const publicMethod: PublicMethod;
