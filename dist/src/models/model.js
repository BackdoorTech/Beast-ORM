var _a;
import { hashCode, uniqueGenerator } from '../utils.js';
import { ModelAPIRequest } from './model-manager.js';
import { objModels } from './register-model.js';
import { FieldType } from '../sql/query/interface.js';
import * as Fields from './field/allFields.js';
import { taskHolder } from '../connection/taskHolder.js';
import { transactionOnCommit } from '../triggers/transaction.js';
import { ReactiveList } from '../reactive/DynamicList.js';
import { signalExecutor, rewrite } from './signal.js';
import { ModelReader } from './model.reader.js';
let methods = {} = {};
// inspire by https://github.com/brianschardt/browser-orm
export class Model {
    constructor() { }
    get(arg) {
        return Model.get(arg);
    }
    getModelName() {
        return this.constructor.name;
    }
    getDBSchema() {
        return {};
    }
    getTableSchema() {
        return {};
    }
    filter(...arg) {
        return Model.filter(arg);
    }
    getPrimaryKeyValue() {
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        return this[idFieldName];
    }
    setDataToInstance(obj, Fields = {}) {
        const tableSchema = this.getTableSchema();
        const fiendsName = tableSchema.fields.map((field) => field.name);
        Fields = {};
        for (let name of fiendsName) {
            Fields[name] = obj[name];
        }
        if (obj[tableSchema.id.keyPath]) {
            Fields[tableSchema.id.keyPath] = obj[tableSchema.id.keyPath];
        }
        return Fields;
    }
    static setDataToInstance(obj, Fields = {}) {
        const tableSchema = this.getTableSchema();
        const fiendsName = tableSchema.fields.map((field) => field.name);
        Fields = {};
        for (let name of fiendsName) {
            Fields[name] = obj[name];
        }
        if (obj[tableSchema.id.keyPath]) {
            Fields[tableSchema.id.keyPath] = obj[tableSchema.id.keyPath];
        }
        return Fields;
    }
    async save() {
        const DBconfig = this.getDBSchema();
        const tableSchema = this.getTableSchema();
        const Fields = this.setDataToInstance(this);
        const methods = [{ methodName: 'save', arguments: Fields }];
        const queryId = uniqueGenerator();
        await ModelAPIRequest.obj(DBconfig, tableSchema).save(methods, queryId);
        taskHolder.finish(queryId);
    }
    async delete() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        const createArg = {};
        createArg[idFieldName] = this[idFieldName];
        const _methods = [{ methodName: 'delete', arguments: createArg }];
        const queryId = uniqueGenerator();
        await ModelAPIRequest.obj(DBconfig, TableSchema).delete(_methods, queryId);
        taskHolder.finish(queryId);
    }
    static async deleteAll() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        const createArg = {};
        createArg[idFieldName] = this[idFieldName];
        const _methods = [{ methodName: 'delete', arguments: '*' }];
        const queryId = uniqueGenerator();
        await ModelAPIRequest.obj(DBconfig, TableSchema).delete(_methods, queryId);
        taskHolder.finish(queryId);
    }
    async all() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const queryId = uniqueGenerator();
        const result = await Model.object({ queryId, DBconfig, TableSchema }).all();
        taskHolder.finish(queryId);
        return result;
    }
    getFields(arg) {
        return Model.getFields(arg);
    }
    formValidation(data) {
        return Model.formValidation(data);
    }
    Value(args) {
        return Model.Value(args);
    }
    static Value(args) {
        return '';
    }
    static formValidation(data) {
        const TableSchema = this.getTableSchema();
        for (let field of TableSchema.fields) {
            const Field = new Fields[field.className](field.fieldAttributes);
            const FieldValue = data[field.name];
            if (!Field.valid(FieldValue)) {
                throw ('invalid insert into ' + TableSchema.name + ', invalid value for field ' + field.name + ' = ' + JSON.stringify(FieldValue));
            }
        }
        return true;
    }
    static async getModelsFields(arg) {
        var _b;
        const newArgs = {};
        const TableSchema = this.getTableSchema();
        if ((_b = TableSchema.id) === null || _b === void 0 ? void 0 : _b.autoIncrement) {
            TableSchema.fields.push({
                keyPath: TableSchema.id.keyPath,
                name: TableSchema.id.keyPath,
                options: {
                    type: FieldType.INT,
                    unique: true
                }
            });
        }
        for (const fieldName in TableSchema.fields) {
            newArgs[fieldName] = arg[fieldName];
        }
    }
    static async all() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const queryId = uniqueGenerator();
        const result = await Model.object({ queryId, DBconfig, TableSchema }).all();
        taskHolder.finish(queryId);
        return result;
    }
    static async get(arg) {
        if (Object.values(arg).length >= 2) {
            throw ("get only works with one field");
        }
        const _methods = [{ methodName: 'get', arguments: arg }];
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const queryId = uniqueGenerator();
        const foundObj = await ModelAPIRequest.obj(DBconfig, TableSchema).get(_methods, queryId);
        taskHolder.finish(queryId);
        if (!foundObj) {
            return false;
        }
        let newInstance = this.newInstance({ TableSchema, DBconfig, dataToMerge: foundObj });
        return newInstance;
    }
    static async getOrCreate(arg) {
        const object = await this.get(arg);
        if (!object) {
            return await this.create(arg);
        }
        else {
            return object;
        }
    }
    static getId() {
        return hashCode(this.toString());
    }
    static getModelName() {
        return this['$tableName'] || this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
    }
    static filter(...arg) {
        const queryId = uniqueGenerator();
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        return this.object({ queryId, DBconfig, TableSchema, some: ['filter', arg] });
    }
    static getDBSchema() {
        return {};
    }
    static getTableSchema() {
        return {};
    }
    static async getEmptyFields() {
        const TableSchema = this.getTableSchema();
        const emptyFields = {};
        let fieldsName;
        if (TableSchema.fields) {
            fieldsName = TableSchema.fields.map((field) => field.name);
        }
        else {
            fieldsName = ModelReader.read(this).fieldNames;
        }
        for (let fieldName of fieldsName) {
            emptyFields[fieldName] = null;
        }

        console.log
        return emptyFields;
    }
    static getFields(arg) {
        let TableSchema = this.getTableSchema();
        let fieldsName;
        if (TableSchema) {
            fieldsName = TableSchema.fields.map((field) => field.name);
            fieldsName.push(TableSchema.id.keyPath);
        }
        else {
            const data = ModelReader.read(this);
            fieldsName = data.fieldNames.concat(data.id);
        }
        const filteredArgs = {};
        for (let fieldName of fieldsName) {
            if (arg.hasOwnProperty(fieldName)) {
                filteredArgs[fieldName] = arg[fieldName];
            }
        }
        return filteredArgs;
    }
    static async create(arg) {
        return new Promise(async (resolve, reject) => {
            if (arg.constructor.name != 'Array') {
                arg = [arg];
            }
            const emptyFields = await this.getEmptyFields();
            const TableSchema = this.getTableSchema();
            const ModelName = TableSchema.name;
            for (let i in arg) {
                arg[i] = this.setDataToInstance(this.getFields(arg[i]), emptyFields);
                if (!this.formValidation(arg[i])) {
                    throw ('invalid ' + JSON.stringify(arg[i]));
                }
            }
            for (let i in arg) {
                if (TableSchema.attributes.foreignKey) {
                    for (let field of TableSchema.attributes.foreignKey) {
                        try {
                            arg[i][field] = arg[i][field].getPrimaryKeyValue();
                        }
                        catch (error) { }
                    }
                }
            }
            const _methods = [{ methodName: 'create', arguments: arg }];
            const DBconfig = this.getDBSchema();
            const queryId = uniqueGenerator();
            const result = [];
            await ModelAPIRequest.obj(DBconfig, TableSchema).create(_methods, queryId, ({ id, index }) => {
                const insert = arg[index];
                insert[TableSchema.id.keyPath] = id;
                const instance = this.newInstance({ TableSchema, DBconfig, dataToMerge: insert });
                result.push(instance);
            });
            taskHolder.updateFunction(queryId, "done", () => {
                if (arg.length == 1) {
                    resolve(result[0]);
                }
                else {
                    resolve(result);
                }
                taskHolder.finish(queryId);
            });
        });
    }
    static getMode(TableSchema) {
        return objModels[TableSchema.databaseName + TableSchema.name];
    }
    static newInstance({ TableSchema, DBconfig, dataToMerge }) {
        const model = this.getMode(TableSchema);
        let newInstance = new model();
        delete newInstance[TableSchema.id.keyPath];
        if (TableSchema.fieldTypes.ManyToManyField) {
            for (let field of TableSchema.fieldTypes.ManyToManyField) {
                delete newInstance[field];
            }
        }
        Object.assign(newInstance, dataToMerge);
        if (newInstance[TableSchema.id.keyPath]) {
            Object.defineProperty(newInstance, TableSchema.id.keyPath, {
                configurable: false,
                writable: false
            });
        }
        delete newInstance.obj;
        return newInstance;
    }
    static async createOrFind(getArg, defaultCreate) {
        const result = await this.filter(getArg).execute();
        const TableSchema = this.getTableSchema();
        const DBconfig = this.getDBSchema();
        let instance;
        let created;
        if (result.length == 1) {
            created = false;
            instance = await this.newInstance({ TableSchema, DBconfig, dataToMerge: result[0] });
        }
        else {
            created = true;
            instance = await this.create(Object.assign(getArg, defaultCreate));
        }
        return { instance, created };
    }
    static async updateOrCreate(...args) {
        if (args.length == 1) {
            if (Array.isArray(args)) {
                const TableSchema = this.getTableSchema();
                const list = args[0];
                const uniqueFields = TableSchema.attributes["unique"][0];
                const uniqueFieldName = uniqueFields;
                const created = await this.create(list);
                const updated = [];
                const same = [];
                const toUpdate = list.filter((e) => {
                    return !created.find(b => b[uniqueFieldName] == e[uniqueFieldName]);
                });
                for (const object of toUpdate) {
                    const params = {};
                    params[uniqueFieldName] = object[uniqueFieldName];
                    let instanceModel = await this.get(params);
                    object[TableSchema.id.keyPath] = instanceModel[TableSchema.id.keyPath];
                    if (JSON.stringify(this.getFields(object)) == JSON.stringify(this.getFields(instanceModel))) {
                        same.push(instanceModel);
                    }
                    else {
                        delete object[TableSchema.id.keyPath];
                        Object.assign(instanceModel, object);
                        await instanceModel.save();
                        updated.push(instanceModel);
                    }
                }
                return { created, updated, same };
            }
            else {
                const TableSchema = this.getTableSchema();
                let instance;
                let created = false;
                const uniqueFields = TableSchema.attributes["unique"].concat(TableSchema.id.keyPath);
                const uniqueFieldName = uniqueFields.find((fieldName) => {
                    if (args[fieldName]) {
                        return true;
                    }
                    return false;
                });
                const params = {};
                params[uniqueFieldName] = args[uniqueFieldName];
                try {
                    const object = await this.get(params);
                    instance = object;
                    await object.save(args);
                }
                catch (error) {
                    instance = await this.create(params);
                    return instance;
                }
                return { instance, created };
            }
        }
        else {
            let argToFind = args[0];
            let argsToUpdate = args[1];
            let { instance, created } = await this.createOrFind(argToFind, argsToUpdate);
            if (!created) {
                const params = Object.assign(argToFind, argsToUpdate);
                instance = Object.assign(instance, params);
                await instance.save();
            }
            return { instance, created };
        }
    }
    static async update(arg) {
        arg = this.getFields(arg);
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const _methods = [{ methodName: 'update', arguments: arg }];
        const queryId = uniqueGenerator();
        const result = await ModelAPIRequest.obj(DBconfig, TableSchema).update(_methods, queryId);
        taskHolder.finish(queryId);
        return result;
    }
    static transactionOnCommit(callback) {
        return transactionOnCommit.subscribe(this, callback);
    }
    static ReactiveList(callback) {
        return ReactiveList.subscribe(this, callback);
    }
}
_a = Model;
Model.object = ({ queryId, DBconfig, TableSchema, some = null }) => {
    const ModelName = TableSchema.name;
    if (!methods[queryId]) {
        methods[queryId] = [];
    }
    if (some) {
        const methodName = some[0];
        const methodArgs = some[1];
        _a.object({ queryId, DBconfig, TableSchema })[methodName](...methodArgs);
    }
    return {
        filter: (...args) => {
            methods[queryId].push({ methodName: 'filter', arguments: args });
            _a.object({ DBconfig, TableSchema, queryId });
        },
        execute: async () => {
            return new Promise(async (resolve, reject) => {
                methods[queryId].push({ methodName: 'execute', arguments: null });
                const _methods = methods[queryId];
                methods[queryId] = [];
                const result = await ModelAPIRequest.obj(DBconfig, TableSchema).execute(_methods, queryId);
                resolve(result);
                for (let i in result) {
                    result[i] = _a.newInstance({ TableSchema, DBconfig, dataToMerge: result[i] });
                }
            });
        },
        update: async (args) => {
            methods[queryId].push({ methodName: 'update', arguments: args });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await ModelAPIRequest.obj(DBconfig, TableSchema).update(_methods, queryId);
        },
        delete: async () => {
            methods[queryId].push({ methodName: 'delete', arguments: null });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await ModelAPIRequest.obj(DBconfig, TableSchema).delete(_methods, queryId);
        },
        all: async () => {
            return new Promise(async (resolve, reject) => {
                methods[queryId].push({ methodName: 'all', arguments: null });
                const _methods = methods[queryId];
                methods[queryId] = [];
                const result = await ModelAPIRequest.obj(DBconfig, TableSchema).all(_methods, queryId);
                resolve(result);
                for (let i in result) {
                    result[i] = _a.newInstance({ TableSchema, DBconfig, dataToMerge: result[i] });
                }
            });
        }
    };
};
export class LocalStorage {
    constructor() { }
    static save(data = {}) {
        const key = this.getTableSchema().id;
        const _data = typeof data == 'object' ? data : {};
        const dataToSave = this.getFields(Object.assign(this, Object.assign({}, _data)));
        const hasSignal = rewrite.hasRewriteSave(key.keyPath);
        if (hasSignal) {
            signalExecutor.rewriteSave(key.keyPath, this, dataToSave);
        }
        else {
            localStorage.setItem(key.keyPath, JSON.stringify(dataToSave));
        }
    }
    static get() {
        const key = this.getTableSchema().id;
        const hasSignal = rewrite.hasRewriteGet(key.keyPath);
        if (hasSignal) {
            signalExecutor.rewriteGet(key.keyPath, this);
        }
        else {
            const restedData = JSON.parse(localStorage.getItem(key.keyPath));
            Object.assign(this, Object.assign({}, restedData));
            return restedData;
        }
    }
    static getModelName() {
        return this['$keyName'] || this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
    }
    static getDBSchema() {
        return;
    }
    static getTableSchema() {
        return;
    }
    static getFields(arg) {
        const TableSchema = this.getTableSchema();
        const DBSchema = this.getDBSchema();
        const ignoreFieldsStartWidth = (DBSchema === null || DBSchema === void 0 ? void 0 : DBSchema.ignoreFieldsStartWidth) || [];
        const filteredArgs = {};
        const fieldsName = TableSchema.fields.map((field) => field.name);
        const fieldNameFilter = fieldsName.filter((fieldName) => {
            for (let Attribute of ignoreFieldsStartWidth) {
                if (fieldName.startsWith(Attribute)) {
                    return false;
                }
            }
            return true;
        });
        for (let fieldName of fieldNameFilter) {
            if (arg.hasOwnProperty(fieldName)) {
                filteredArgs[fieldName] = arg[fieldName];
            }
        }
        return filteredArgs;
    }
    static formValidation(data) {
        const TableSchema = this.getTableSchema();
        for (let field of TableSchema.fields) {
            const Field = new Fields[field.className](field.fieldAttributes);
            const FieldValue = data[field.name];
            if (!Field.valid(FieldValue)) {
                throw ('invalid insert into ' + TableSchema.name + ', invalid value for field ' + field.name + ' = ' + JSON.stringify(FieldValue));
            }
        }
        return true;
    }
    static clear() {
        this.clearComponent();
        this.clearStorage();
    }
    static clearComponent() {
        const key = this.getTableSchema().id;
    }
    static clearStorage() {
        const key = this.getTableSchema().id;
        const hasSignal = rewrite.hasRewriteDelete(key.keyPath);
        if (hasSignal) {
            signalExecutor.rewriteDelete(key.keyPath, this);
        }
        else {
            localStorage.removeItem(key.keyPath);
        }
    }
}
