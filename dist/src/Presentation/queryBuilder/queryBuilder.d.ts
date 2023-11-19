import { IQuery } from '../../BusinessLayer/_interface/Apresentation/queryBuilder.js';
import { Model } from '../Api.js';
/**
 * Represents a query builder for creating Query instances.
 * This query builder service allows you to create INSERT, UPDATE, and DELETE queries
 */
export declare class QueryBuilder {
    /**
     * Create a new QueryBuilder instance.
     */
    query: IQuery;
    model: typeof Model;
    createdDate: Date;
    constructor({ isParamsArray }: {
        isParamsArray: any;
    });
    /**
     * Start building an INSERT query.
     * @param {string} table - The name of the table to insert data into.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    insertInto(table: typeof Model): this;
    /**
     * Start building an INSERT query.
     * @param {string} table - The name of the table to insert data into.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    select(table: typeof Model): this;
    /**
     * Start building an UPDATE query.
     * @param {string} table - The name of the table to update data in.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    update(table: typeof Model): this;
    /**
     * Start building a DELETE query.
     * @param {string} table - The name of the table to delete data from.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    deleteFrom(table: typeof Model): this;
    /**
     * Insert data into the specified table.
     * @param {Array} values - An array of objects to insert into the table.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    insert(values: Object | Array<Object>): this;
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
    limit(num: number): this;
    hasIndex(boolean: Boolean): void;
    /**
     * Build and return the SQL query string.
     * @returns {string} The SQL query string.
     */
    setCleanData(processedData: any): void;
    get hasNoCondition(): boolean;
}
