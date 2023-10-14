/**
 * Represents a query builder for creating Query instances.
 * This query builder service allows you to create INSERT, UPDATE, and DELETE queries
 */
export class QueryBuilder {
    constructor() {
        /**
         * Create a new QueryBuilder instance.
         */
        this.query = {
            type: '',
            table: {},
            values: [],
            updateValues: {},
            where: [],
        };
    }
    /**
     * Start building an INSERT query.
     * @param {string} table - The name of the table to insert data into.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    insertInto(table) {
        this.query.type = 'INSERT';
        this.query.table = table;
        return this;
    }
    /**
     * Start building an INSERT query.
     * @param {string} table - The name of the table to insert data into.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    select(table) {
        this.query.type = 'SELECT';
        this.query.table = table;
        return this;
    }
    /**
     * Start building an UPDATE query.
     * @param {string} table - The name of the table to update data in.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    update(table) {
        this.query.type = 'UPDATE';
        this.query.table = table;
        return this;
    }
    /**
     * Start building a DELETE query.
     * @param {string} table - The name of the table to delete data from.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    deleteFrom(table) {
        this.query.type = 'DELETE';
        this.query.table = table;
        return this;
    }
    /**
     * Insert data into the specified table.
     * @param {Array} values - An array of objects to insert into the table.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    insert(values) {
        if (this.query.type === 'INSERT') {
            this.query.values = this.query.values.concat(values);
        }
        return this;
    }
    /**
     * Set values for an UPDATE query.
     * @param {Object} values - An object representing key-value pairs to update in the table.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    set(values) {
        if (this.query.type === 'UPDATE') {
            this.query.updateValues = Object.assign(Object.assign({}, this.query.updateValues), values);
        }
        return this;
    }
    /**
     * Add a WHERE condition to the query.
     * @param {string} condition - The WHERE condition to add to the query.
     * @returns {QueryBuilder} The QueryBuilder instance.
     */
    where(condition) {
        this.query.where.push(condition);
        return this;
    }
    limit(num) { }
}
