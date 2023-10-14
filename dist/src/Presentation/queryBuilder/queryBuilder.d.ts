import { IModel } from '../Api.type.js';
/**
 * Represents a query builder for creating Query instances.
 * This query builder service allows you to create INSERT, UPDATE, and DELETE queries
 */
export declare class QueryBuilder {
    /**
     * Create a new QueryBuilder instance.
     */
    query: {
        type: string;
        table: {};
        values: any[];
        updateValues: {};
        where: any[];
    };
    constructor();
    /**
     * Start building an INSERT query.
     * @param {string} table - The name of the table to insert data into.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    insertInto(table: IModel<any>): this;
    /**
     * Start building an INSERT query.
     * @param {string} table - The name of the table to insert data into.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    select(table: IModel<any>): this;
    /**
     * Start building an UPDATE query.
     * @param {string} table - The name of the table to update data in.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    update(table: IModel<any>): this;
    /**
     * Start building a DELETE query.
     * @param {string} table - The name of the table to delete data from.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    deleteFrom(table: IModel<any>): this;
    /**
     * Insert data into the specified table.
     * @param {Array} values - An array of objects to insert into the table.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    insert(values: any): this;
    /**
     * Set values for an UPDATE query.
     * @param {Object} values - An object representing key-value pairs to update in the table.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    set(values: any): this;
    /**
     * Add a WHERE condition to the query.
     * @param {string} condition - The WHERE condition to add to the query.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    where(condition: Object): this;
    limit(num: number): void;
}
