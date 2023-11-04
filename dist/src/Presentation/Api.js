import { QueryBuilder } from "./queryBuilder/queryBuilder.js"; // Represents a query object that helps build and execute database queries.
import { ORM } from "../BusinessLayer/beastOrm.js";
import { RuntimeMethods as RM } from "../BusinessLayer/modelManager/runtimeMethods/runTimeMethods.js";
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
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        queryBuilder.insertInto(this[RM.getModel]()).insert(args);
    }
    static async get() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        queryBuilder
            .select(this)
            .where(this)
            .limit(1);
        return {};
    }
    static async all() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        queryBuilder.select(this);
        return {};
    }
    static getOrCreate(...params) {
        const isParamsArray = Array.isArray(params) ? true : false;
        const queryBuilder = new QueryBuilder({ isParamsArray });
        const object = queryBuilder.select(this)
            .where(params)
            .limit(1);
        if (object) {
            return object;
        }
        return new QueryBuilder({ isParamsArray }).insert(params);
    }
    static async create(params) {
        const isParamsArray = Array.isArray(params) ? true : false;
        const queryBuilder = new QueryBuilder({ isParamsArray });
        queryBuilder.insertInto(this).insert(params);
        return await ORM.executeInsertionQuery(queryBuilder, this);
    }
    async delete() {
        const isParamsArray = false;
        const queryBuilder = new QueryBuilder({ isParamsArray });
        const model = this[RM.getModel]();
        const tableSchema = Model[RM.getTableSchema]();
        const filter = {};
        const idFieldName = tableSchema.id.keyPath;
        filter[idFieldName] = this[idFieldName];
        queryBuilder.deleteFrom(model).where(filter).limit(1);
        return await ORM.deleteQueryNoFormValidation(queryBuilder, model);
    }
    static async updateOrCreate(...args) {
        this.getOrCreate(args);
        return {};
    }
    async update() { }
    static filter() {
        // return returnSelf.object()
    }
}
class peter extends Model {
    nice() {
    }
    static cars() { }
}
(async () => {
    const { value } = await peter.create({});
    value.delete();
});
