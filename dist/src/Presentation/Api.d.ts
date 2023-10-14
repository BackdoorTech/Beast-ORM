import { IModel } from "./Api.type.js";
/**
 * Represents a model for database operations.
 */
export declare class Model<Model> implements IModel<Model> {
    static getTableSchema: () => import("c:/Users/peter.maquiran/Documents/project/beast-ORM-v0/src/BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type.js").TableSchema;
    /**
     * Retrieve data from the database with specified filter parameters.
     * @param params - The filter parameters for the query.
     * @returns A promise that resolves with the query results.
     */
    save(...args: any[]): Promise<void>;
    get(): Promise<any>;
    all(): Promise<any>;
    getOrCreate(...params: any[]): any;
    create(...params: any[]): Promise<any>;
    delete(params: any): any;
    updateOrCreate(...args: any[]): Promise<any>;
    update(): Promise<void>;
    filter(): void;
}
