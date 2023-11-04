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
    static get(): Promise<any>;
    static all(): Promise<any>;
    static getOrCreate(...params: any[]): any;
    static create<T>(params: any): Promise<import("../Utility/Either/index.js").Either<T, import("../BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
    delete(): Promise<import("../Utility/Either/index.js").Either<true, import("../BusinessLayer/validation/fields/allFields.type.js").FormValidationError>>;
    static updateOrCreate(...args: any[]): Promise<any>;
    update(): Promise<void>;
    static filter(): void;
}
