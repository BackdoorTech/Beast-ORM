import { IModel } from "./Api.type.js";
import { ITableSchema } from "../BusinessLayer/_interface/interface.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    static getTableSchema(): ITableSchema;
    static getModel(): typeof Model;
    getModel(): typeof Model;
    static get(): Promise<any>;
    static all(): Promise<any>;
    static create<T>(params: any): Promise<T>;
    save(params?: any): Promise<any>;
    delete(): Promise<true>;
}
