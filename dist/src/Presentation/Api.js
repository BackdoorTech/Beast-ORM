import { QueryBuilder } from "./queryBuilder/queryBuilder.js"; // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js"; // Represents a return object for query-related methods
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
    static async get(value) {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        queryBuilder
            .select(model)
            .where(value)
            .limit(1)
            .hasIndex(true);
        const result = await ORM.executeSelectQuery(queryBuilder, this);
        if (result.isError) {
            throw (result.error);
        }
        else {
            return result.value;
        }
    }
    static async all() {
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
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
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
        const model = this.getModel();
        queryBuilder.deleteFrom(model);
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
    static filter(value) {
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
        const model = this.getModel();
        queryBuilder.where(value);
        return returnSelf.object(queryBuilder, model);
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
            return true;
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
