import { IModel, IModelStatic, self } from "./Api.type.js";
import { ICallBackReactiveList, ITableSchema } from "../BusinessLayer/_interface/interface.type.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    static getTableSchema(): ITableSchema;
    static getModel(): typeof Model;
    getModel(): typeof Model;
    static getModelSchema(): any;
    get(): Promise<boolean>;
    static get(value: Object): Promise<any>;
    static all<T>(): Promise<T[]>;
    static deleteAll(): Promise<number | true>;
    static create<T>(params: any): Promise<T>;
    static filter<T>(value: Object): {
        execute: () => Promise<T>;
        update: (params: any) => Promise<number | true>;
        delete: () => Promise<number | true>;
    };
    save(params?: any): Promise<boolean>;
    getPrimaryKeyValue(): number | string;
    setPrimaryKey(key: number | string): void;
    delete(): Promise<number | true>;
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
}
export declare const $B: <T>(model: self<T>) => IModelStatic<T>;
