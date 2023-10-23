import { IModel } from "./Api.type.js";
import { TableSchema } from "../../_src/models/register-modal.interface.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    static getTableSchema: () => TableSchema;
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
