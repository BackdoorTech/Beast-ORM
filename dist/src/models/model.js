var _a, _b;
import { hashCode, uniqueGenerator } from '../utils.js';
import { ModelManager } from './model-manager.js';
import { models, modelsConfig, modelsConfigLocalStorage } from './register-model.js';
import { FieldType } from '../sql/query/interface.js';
import * as Fields from './field/allFields.js';
import { IndexedDBWorkerQueue } from '../connection/worker.queue.js';
import { transactionOnCommit } from '../triggers/transaction.js';
import { ReactiveList } from '../reactive/DynamicList.js';
let methods = {} = {};
// inspire by https://github.com/brianschardt/browser-orm
export class Model extends (_b = ModelManager) {
    constructor(obg) {
        super();
        Object.assign(this, obg);
    }
    get(arg) {
        return Model.get(arg);
    }
    getDBSchema() {
        const modelName = this.constructor.name;
        return modelsConfig[modelName].DatabaseSchema;
    }
    getModelName() {
        return this.constructor.name;
    }
    filter(...arg) {
        return Model.filter(arg);
    }
    getTableSchema() {
        const modelName = this.constructor.name;
        return modelsConfig[modelName].TableSchema;
    }
    getPrimaryKeyValue() {
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        return this[idFieldName];
    }
    async save() {
        const DBconfig = this.getDBSchema();
        const tableSchema = this.getTableSchema();
        const fiendsName = tableSchema.fields.map((field) => field.name);
        fiendsName.push(tableSchema.id.keyPath);
        const Fields = {};
        for (let name of fiendsName) {
            Fields[name] = this[name];
        }
        const methods = [{ methodName: 'save', arguments: Fields }];
        const queryId = uniqueGenerator();
        await Model.obj(DBconfig, tableSchema).save(methods, queryId);
        IndexedDBWorkerQueue.finish(queryId);
    }
    async delete() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        const createArg = {};
        createArg[idFieldName] = this[idFieldName];
        const _methods = [{ methodName: 'delete', arguments: createArg }];
        const queryId = uniqueGenerator();
        await Model.obj(DBconfig, TableSchema).delete(_methods, queryId);
        IndexedDBWorkerQueue.finish(queryId);
    }
    static async deleteAll() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        const createArg = {};
        createArg[idFieldName] = this[idFieldName];
        const _methods = [{ methodName: 'delete', arguments: '*' }];
        const queryId = uniqueGenerator();
        await Model.obj(DBconfig, TableSchema).delete(_methods, queryId);
        IndexedDBWorkerQueue.finish(queryId);
    }
    async all() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const queryId = uniqueGenerator();
        const result = await Model.object({ queryId, DBconfig, TableSchema }).all();
        IndexedDBWorkerQueue.finish(queryId);
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
        var _c;
        const newArgs = {};
        const TableSchema = this.getTableSchema();
        if ((_c = TableSchema.id) === null || _c === void 0 ? void 0 : _c.autoIncrement) {
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
        IndexedDBWorkerQueue.finish(queryId);
        return result;
    }
    static async get(arg) {
        const _methods = [{ methodName: 'get', arguments: arg }];
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const queryId = uniqueGenerator();
        const foundObj = await super.obj(DBconfig, TableSchema).get(_methods, queryId);
        IndexedDBWorkerQueue.finish(queryId);
        if (!foundObj) {
            return false;
        }
        const ModelName = this.getModelName();
        let newInstance = this.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: foundObj });
        delete newInstance.obj;
        return newInstance;
    }
    static getId() {
        return hashCode(this.toString());
    }
    static getModelName() {
        return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
    }
    static filter(...arg) {
        const queryId = uniqueGenerator();
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const newInstanceModel = this.NewModelInstance();
        const result = Object.assign(newInstanceModel, this.object({ queryId, DBconfig, TableSchema, some: ['filter', arg] }));
        IndexedDBWorkerQueue.finish(queryId);
        return result;
    }
    static NewModelInstance() {
        class newInstanceModel {
        }
        Object.assign(newInstanceModel, this);
        return newInstanceModel;
    }
    static getDBSchema() {
        const modalName = this.getModelName();
        return modelsConfig[modalName].DatabaseSchema;
    }
    static getTableSchema() {
        const modalName = this.getModelName();
        return modelsConfig[modalName].TableSchema;
    }
    static async getEmptyFields() {
        const TableSchema = this.getTableSchema();
        const emptyFields = {};
        const fieldsName = TableSchema.fields.map((field) => field.name);
        for (let fieldName of fieldsName) {
            emptyFields[fieldName] = null;
        }
        return emptyFields;
    }
    static getFields(arg) {
        const TableSchema = this.getTableSchema();
        const filteredArgs = {};
        const fieldsName = TableSchema.fields.map((field) => field.name);
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
                arg[i] = Object.assign(Object.assign({}, emptyFields), this.getFields(arg[i]));
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
            const createObjectRequest = super.obj(DBconfig, TableSchema).create(_methods, queryId);
            const createObject = await createObjectRequest;
            IndexedDBWorkerQueue.finish(queryId);
            if (createObject) {
                if (typeof createObject[TableSchema.id.keyPath] == 'object') {
                    throw (createObject[TableSchema.id.keyPath].error);
                }
                else {
                    if (Array.isArray(createObject)) {
                        resolve(createObject);
                        for (let a in createObject) {
                            createObject[a] = this.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: createObject[a] });
                        }
                        return arg;
                    }
                    else {
                        const instance = this.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: createObject });
                        resolve(instance);
                    }
                }
            }
        });
    }
    static newInstance({ TableSchema, DBconfig, ModelName, dataToMerge }) {
        let newInstance = new models[ModelName]();
        delete newInstance[TableSchema.id.keyPath];
        if (TableSchema.fieldTypes.ManyToManyField) {
            for (let field of TableSchema.fieldTypes.ManyToManyField) {
                newInstance[field] = null;
            }
        }
        if (TableSchema.fieldTypes.OneToOneField) {
            for (let field of TableSchema.fieldTypes.ManyToManyField) {
                newInstance[field] = null;
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
        const ModelName = this.getModelName();
        let instance;
        let created;
        if (result.length == 1) {
            created = false;
            instance = await this.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: result[0] });
        }
        else {
            created = true;
            instance = await this.create(Object.assign(getArg, defaultCreate));
        }
        return [instance, created];
    }
    static async updateOrCreate(argToFind, argsToUpdate) {
        let [instance, created] = await this.createOrFind(argToFind, argsToUpdate);
        if (!created) {
            const params = Object.assign(argToFind, argsToUpdate);
            instance = Object.assign(instance, params);
            await instance.save();
        }
        return instance;
    }
    static async update(arg) {
        arg = this.getFields(arg);
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const _methods = [{ methodName: 'update', arguments: arg }];
        const queryId = uniqueGenerator();
        const result = await super.obj(DBconfig, TableSchema).update(_methods, queryId);
        IndexedDBWorkerQueue.finish(queryId);
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
            const newInstanceModel = _a.NewModelInstance();
            return Object.assign(newInstanceModel, _a.object({ DBconfig, TableSchema, queryId }));
        },
        execute: async () => {
            return new Promise(async (resolve, reject) => {
                methods[queryId].push({ methodName: 'execute', arguments: null });
                const _methods = methods[queryId];
                methods[queryId] = [];
                const result = await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).execute(_methods, queryId);
                resolve(result);
                for (let i of result) {
                    result[i] = _a.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: result[i] });
                }
            });
        },
        update: async (args) => {
            methods[queryId].push({ methodName: 'update', arguments: args });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).update(_methods, queryId);
        },
        delete: async () => {
            methods[queryId].push({ methodName: 'delete', arguments: null });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).delete(_methods, queryId);
        },
        all: async () => {
            return new Promise(async (resolve, reject) => {
                methods[queryId].push({ methodName: 'all', arguments: null });
                const _methods = methods[queryId];
                methods[queryId] = [];
                const result = await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).all(_methods, queryId);
                resolve(result);
                for (let i of result) {
                    result[i] = _a.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: result[i] });
                }
            });
        }
    };
};
export class LocalStorage {
    constructor() { }
    static save(data = {}) {
        const dataToSave = this.getFields(Object.assign(this, Object.assign({}, data)));
        const key = this.getTableSchema().id;
        localStorage.setItem(key.keyPath, JSON.stringify(dataToSave));
    }
    static get() {
        const key = this.getTableSchema().id;
        const restedData = JSON.parse(localStorage.getItem(key.keyPath));
        Object.assign(this, Object.assign({}, restedData));
        return restedData;
    }
    static getModelName() {
        return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
    }
    static getDBSchema() {
        const modalName = this.getModelName();
        return modelsConfigLocalStorage[modalName].DatabaseSchema;
    }
    static getTableSchema() {
        const modalName = this.getModelName();
        return modelsConfigLocalStorage[modalName].TableSchema;
    }
    static getIgnoreAttributes() {
        return false;
    }
    static ignoreAttributes(attributesStartWidth = []) {
        if (!this.getIgnoreAttributes()) {
            this.getIgnoreAttributes = () => {
                return attributesStartWidth;
            };
        }
    }
    static getFields(arg) {
        const TableSchema = this.getTableSchema();
        const filteredArgs = {};
        const fieldsName = TableSchema.fields.map((field) => field.name);
        const Attributes = this.getIgnoreAttributes();
        const fieldNameFilter = fieldsName.filter((fieldName) => {
            if (Attributes) {
                for (let Attribute of Attributes) {
                    if (fieldName.startsWith(Attribute)) {
                        return false;
                    }
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
        localStorage.removeItem(key.keyPath);
    }
}
