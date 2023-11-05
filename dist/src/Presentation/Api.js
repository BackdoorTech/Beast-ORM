import { QueryBuilder } from "./queryBuilder/queryBuilder.js"; // Represents a query object that helps build and execute database queries.
import { ORM } from "../BusinessLayer/beastOrm.js";
import { dataParameters } from "../BusinessLayer/modelManager/dataParameters.js";
/**
 * Represents a model for database operations.
 */
export class Model {
    static getTableSchema() {
        return {};
    }
    static getModel() {
        return { cars: 'd' };
    }
    getModel() {
        return { cars: 'd' };
    }
    static async get() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        queryBuilder
            .select(model)
            .where(model)
            .limit(1);
        return {};
    }
    static async all() {
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        queryBuilder.select(model);
        const result = await ORM.executeSelectQuery(queryBuilder, this);
        if (result.isError) {
            throw (result.error);
        }
        else {
            return result.value;
        }
    }
    static async deleteAll() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        queryBuilder.deleteFrom(model).where({}).limit(1);
        const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model);
        if (result.isError) {
            throw (result.error);
        }
        else {
            return result.value;
        }
    }
    static async create(params) {
        const isParamsArray = Array.isArray(params) ? true : false;
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray });
        queryBuilder.insertInto(model).insert(params);
        const result = await ORM.executeInsertionQuery(queryBuilder, this);
        if (result.isError) {
            throw (result.error);
        }
        else {
            return result.value;
        }
    }
    async save(params = false) {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        if (params) {
            const tableSchema = model.getTableSchema();
            const data = dataParameters.getFilteredData(tableSchema, params);
            Object.assign(this, data);
        }
        const filter = {};
        const idFieldName = tableSchema.id.keyPath;
        filter[idFieldName] = this[idFieldName];
        queryBuilder.update(model).set(this).where(filter).limit(1).hasIndex(true);
        const result = await ORM.executeUpdateQuery(queryBuilder, model);
        if (result.isError) {
            throw (result.error);
        }
        else {
            return result.value;
        }
    }
    // delete one
    async delete() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const filter = {};
        const idFieldName = tableSchema.id.keyPath;
        filter[idFieldName] = this[idFieldName];
        queryBuilder.deleteFrom(model).where(filter).limit(1).hasIndex(true);
        const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model);
        if (result.isError) {
            throw (result.error);
        }
        else {
            return result.value;
        }
    }
}
