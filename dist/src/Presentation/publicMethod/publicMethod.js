import { ORM } from "../../BusinessLayer/beastOrm.js";
import { dataParameters } from "../../BusinessLayer/modelManager/dataParameters.js";
import { logger } from "../logger.js";
import { QueryBuilder } from "../queryBuilder/queryBuilder.js";
import { returnSelf } from "../returnSelf/returnSelf.js";
export class PublicMethodStatic {
    static getTableSchema() {
        throw ("Register your Model before using the API");
    }
    static getModel() {
        throw ("Register your Model before using the API");
    }
    static getModelSchema() {
        console.error("Register your Model before using the API");
    }
    static async get(value) {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const filter = dataParameters.getUniqueData(tableSchema, value);
        console.log({ filter });
        queryBuilder
            .select(model)
            .where(filter)
            .limit(1)
            .hasIndex(true);
        const result = await ORM.executeSelectQuery(queryBuilder, this);
        if (result.isError) {
            // console.log('%cThis text is red and has a larger font!', 'color: red; font-size: larger');
            // console.error(result.error)
        }
        return result;
    }
    static async all() {
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
        queryBuilder.select(model);
        const result = await ORM.executeSelectQuery(queryBuilder, this);
        if (result.isError) {
            // console.error(result.error)
        }
        return result;
    }
    static async deleteAll() {
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
        const model = this.getModel();
        queryBuilder.deleteFrom(model);
        const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model);
        if (result.isError) {
            // console.error(result.error)
        }
        return result;
    }
    static async create(params) {
        const isParamsArray = Array.isArray(params) ? true : false;
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray });
        // console.log({params})
        queryBuilder.insertInto(model).insert(params);
        const result = await ORM.executeInsertionQuery(queryBuilder, this);
        if (result.isError) {
            // console.error(result.error)
        }
        return result;
    }
    static filter(value) {
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
        const model = this.getModel();
        queryBuilder.where(value);
        return returnSelf.object(queryBuilder, model);
    }
    static magic() {
        return new this();
    }
    static transactionOnCommit(fn) {
        return ORM.registerTrigger(this, fn);
    }
    static ReactiveList(callback) {
        return ORM.ReactiveList(this, callback);
    }
}
export class PublicMethod {
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
        return await ORM.executeUpdateQuery(queryBuilder, model);
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
            // console.error(result.error)
        }
        return result;
    }
    async get() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const filter = dataParameters.getUniqueData(tableSchema, this);
        queryBuilder
            .select(model)
            .where(filter)
            .limit(1)
            .hasIndex(true);
        // console.log({queryBuilder})
        const result = await ORM.executeSelectQuery(queryBuilder, this);
        if (result.isError) {
            logger.error(result.error);
        }
        else {
            Object.assign(this, result.value);
        }
        return result;
    }
}
export const publicMethod = new PublicMethod();
