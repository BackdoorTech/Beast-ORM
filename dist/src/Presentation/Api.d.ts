import { IModel } from "./Api.type.js";
import { ITableSchema } from "../BusinessLayer/_interface/interface.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    static getTableSchema: () => ITableSchema;
    /**
     * Retrieve data from the database with specified filter parameters.
     * @param params - The filter parameters for the query.
     * @returns A promise that resolves with the query results.
     */
    save(...args: any[]): Promise<void>;
    get(): Promise<any>;
    all(): Promise<any>;
    getOrCreate(...params: any[]): any;
    static create(params: any): Promise<any>;
    delete(params: any): any;
    updateOrCreate(...args: any[]): Promise<any>;
    update(): Promise<void>;
    filter(): void;
}
