import { QueryBuilder } from "./queryBuilder/queryBuilder.js"; // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js"; // Represents a return object for query-related methods
import { ORM } from "../BusinessLayer/beastOrm.js";
import { dataParameters } from "../BusinessLayer/modelManager/dataParameters.js";
import { APIError, APIOk } from "../Utility/Either/APIResponse.js";
import { BulkDataUniqueFieldError } from "../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
/**
 * Represents a model for database operations.
 */
export class Model {
    getModel() {
        throw ("Register your Model before using the API");
    }
    async save(params) {
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
            return APIError(result.error);
        }
        else {
            return APIOk(result.value);
        }
    }
    getPrimaryKeyValue() {
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const idFieldName = tableSchema.id.keyPath;
        console.log(this);
        return this[idFieldName];
    }
    setPrimaryKey(key) {
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const primaryKeyFieldName = tableSchema.id.keyPath;
        this[primaryKeyFieldName] = key;
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
            return APIError(result.error);
        }
        else {
            return APIOk(result.value);
        }
    }
    async get() {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const filter = dataParameters.getUniqueData(tableSchema, this);
        console.log({ filter });
        queryBuilder
            .select(model)
            .where(filter)
            .limit(1)
            .hasIndex(true);
        // console.log({queryBuilder})
        const result = await ORM.executeSelectQuery(queryBuilder, this).one();
        console.log(result);
        if (result.isError) {
            return APIError(result.error);
        }
        else {
            Object.assign(this, result.value);
            return APIOk(result.value);
        }
    }
    static getTableSchema() {
        throw ("Register your Model before using the API");
    }
    static getModel() {
        throw ("Register your Model before using the API");
    }
    static getModelSchema() {
        throw ("Register your Model before using the API");
    }
    static async get(value) {
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        const filter = dataParameters.getUniqueData(tableSchema, value);
        queryBuilder
            .select(model)
            .where(filter)
            .limit(1)
            .hasIndex(true);
        const result = await ORM.executeSelectQuery(queryBuilder, this).one();
        if (result.isError) {
            return APIError(result.error);
        }
        else {
            return APIOk(result.value);
        }
    }
    static async all() {
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray: false });
        queryBuilder.select(model);
        const result = await ORM.executeSelectQuery(queryBuilder, this).many();
        if (result.isError) {
            return APIError(result.error);
        }
        else {
            return APIOk(result.value);
        }
    }
    static async deleteAll() {
        const queryBuilder = new QueryBuilder({ isParamsArray: true });
        const model = this.getModel();
        queryBuilder.deleteFrom(model);
        const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model);
        if (result.isError) {
            return APIError(result.error);
        }
        else {
            return APIOk(result.value);
        }
    }
    static async create(params) {
        const isParamsArray = Array.isArray(params) ? true : false;
        const model = this.getModel();
        const queryBuilder = new QueryBuilder({ isParamsArray });
        queryBuilder.insertInto(model).insert(params);
        const result = await ORM.executeInsertionQuery(queryBuilder, this);
        if (result.isError) {
            return APIError(result.error);
        }
        else {
            return APIOk(result.value);
        }
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
    static async getOrCreate(params) {
        var _a;
        const isParamsArray = Array.isArray(params) ? true : false;
        const paramsA = ((_a = params === null || params === void 0 ? void 0 : params.constructor) === null || _a === void 0 ? void 0 : _a.name) != 'Array' ? [params] : params;
        const paramUnique = [];
        const model = this.getModel();
        const tableSchema = model.getTableSchema();
        for (const i in paramsA) {
            const ProcessedDataUniqueFieldOnly = dataParameters.getUniqueData(tableSchema, paramsA[i]);
            paramUnique[i] = ProcessedDataUniqueFieldOnly;
            if (!dataParameters.hasField(ProcessedDataUniqueFieldOnly)) {
                return APIError(new BulkDataUniqueFieldError({ data: ProcessedDataUniqueFieldOnly, index: i, rows: paramsA, table: tableSchema.name }));
            }
        }
        const allRequestToPerform = paramsA.map(param => {
            const queryBuilderGet = new QueryBuilder({ isParamsArray: false });
            queryBuilderGet
                .select(model)
                .where(param)
                .limit(1)
                .hasIndex(true);
            return ORM.executeSelectQuery(queryBuilderGet, this).one();
        });
        const allFindRequest = await Promise.all(allRequestToPerform);
        const created = [];
        const found = [];
        const list = [];
        const toCreate = [];
        for (let i = 0; i < allFindRequest.length; i++) {
            const findRequest = allFindRequest[i];
            if (findRequest.isError) {
                toCreate.push({ ItemNotFound: findRequest.error, index: i });
            }
            else {
                found.push(findRequest.value);
            }
        }
        const queryBuilderCreate = new QueryBuilder({ isParamsArray: true });
        queryBuilderCreate.insertInto(model);
        for (const { ItemNotFound, index } of toCreate) {
            const dataToInsert = paramsA[index];
            const ProcessedData = dataParameters.getFilteredData(tableSchema, dataToInsert);
            const agr = ProcessedData;
            queryBuilderCreate.insert(agr);
        }
        const result = await ORM.executeInsertionQuery(queryBuilderCreate, this);
        // if(result.isError) {
        //   return APIError(result.error)
        // } else {
        //   return APIOk(result.value)
        // }
        return 0;
    }
}
