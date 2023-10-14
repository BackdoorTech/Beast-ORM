import { QueryBuilder } from "./queryBuilder/queryBuilder.js"; // Represents a query object that helps build and execute database queries.
/**
 * Represents a model for database operations.
 */
export class Model {
    /**
     * Retrieve data from the database with specified filter parameters.
     * @param params - The filter parameters for the query.
     * @returns A promise that resolves with the query results.
     */
    async save(...args) {
        const queryBuilder = new QueryBuilder();
        queryBuilder.insertInto(this).insert(args);
    }
    async get() {
        const queryBuilder = new QueryBuilder();
        queryBuilder
            .select(this)
            .where(this)
            .limit(1);
        return {};
    }
    async all() {
        const queryBuilder = new QueryBuilder();
        queryBuilder.select(this);
        return {};
    }
    getOrCreate(...params) {
        const queryBuilder = new QueryBuilder();
        const object = queryBuilder.select(this)
            .where(params)
            .limit(1);
        if (object) {
            return object;
        }
        return new QueryBuilder().insert(params);
    }
    async create(...params) {
        const queryBuilder = new QueryBuilder();
        return queryBuilder.insert(this).insert(params);
    }
    async delete(params) {
        const queryBuilder = new QueryBuilder();
        return queryBuilder.deleteFrom(this).where(params).limit(1);
    }
    async updateOrCreate(...args) {
        this.getOrCreate(args);
        return {};
    }
    async update() { }
    filter() {
        // return returnSelf.object()
    }
}
