import { IModel } from "./Api.type.js";
import { ITableSchema } from "../BusinessLayer/_interface/interface.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    static getTableSchema(): ITableSchema;
    static getModel(): typeof Model;
    getModel(): typeof Model;
    static get(value: Object): Promise<any>;
    static all(): Promise<any>;
    static deleteAll(): Promise<number | true>;
    static create<T>(params: any): Promise<T>;
    static filter<T>(value: Object): {
        execute: () => Promise<T>;
        update: (params: any) => Promise<number | true>;
        delete: () => Promise<number | true>;
    };
    save(params?: any): Promise<boolean>;
    delete(): Promise<number | true>;
}
