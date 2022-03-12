var _a, _b;
import { hashCode, uniqueGenerator } from '../utils.js';
import { ModelManager } from './model-manager.js';
import { models, modelsConfig } from './register-model.js';
let methods = {} = {};
let modalSpace = {};
// inspire by https://github.com/brianschardt/browser-orm
export class Model extends (_b = ModelManager) {
    constructor(obg) {
        super();
        Object.assign(this, obg);
    }
    get(arg) {
        return Model.get(arg);
    }
    setDBConfig(config) {
        Model.setDBConfig(config);
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
        console.log(this.constructor);
        return modelsConfig[modelName].TableSchema;
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
        await Model.obj(DBconfig, tableSchema).save(methods);
    }
    async delete() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const idFieldName = TableSchema.id.keyPath;
        const createArg = {};
        createArg[idFieldName] = this[idFieldName];
        const _methods = [{ methodName: 'delete', arguments: createArg }];
        await Model.obj(DBconfig, TableSchema).delete(_methods);
    }
    async all() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        return await Model.object({ DBconfig, TableSchema }).all();
    }
    static async all() {
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        return await Model.object({ DBconfig, TableSchema }).all();
    }
    static async get(arg) {
        const _methods = [{ methodName: 'get', arguments: arg }];
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const foundObj = await super.obj(DBconfig, TableSchema).get(_methods);
        if (!foundObj) {
            return false;
        }
        const ModelName = this.getModelName();
        let newInstance = new models[ModelName]();
        Object.assign(newInstance, Object.assign({}, foundObj));
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
        return Object.assign(this, this.object({ queryId, DBconfig, TableSchema, some: ['filter', arg] }));
    }
    static setDBConfig(config) {
        var _c;
        const id = this.getId();
        const modalName = this.getModelName();
        if (((_c = modalSpace[modalName]) === null || _c === void 0 ? void 0 : _c.databaseSchema) == null) {
            modalSpace[modalName] = Object.assign(modalSpace[modalName] || {}, { databaseSchema: config });
        }
    }
    static getDBSchema() {
        const modalName = this.getModelName();
        return modalSpace[modalName].databaseSchema;
    }
    static getTableSchema() {
        const modalName = this.getModelName();
        const databaseSchema = modalSpace[modalName].databaseSchema;
        const tableSchema = databaseSchema.stores.find((e) => e.name == this.getModelName());
        return tableSchema;
    }
    static async getEmptyFields() {
        const TableSchema = this.getTableSchema();
        const emptyFields = {};
        const fieldsName = TableSchema.fields.map((field) => field.name);
        for (let fieldName of fieldsName) {
            emptyFields[fieldName] = '';
        }
        return emptyFields;
    }
    static async create(arg) {
        if (arg.constructor.name != 'Array') {
            arg = [arg];
        }
        const emptyFields = await this.getEmptyFields();
        for (let i in arg) {
            arg[i] = Object.assign(Object.assign({}, emptyFields), arg[i]);
        }
        const TableSchema = this.getTableSchema();
        const _methods = [{ methodName: 'create', arguments: arg }];
        const DBconfig = this.getDBSchema();
        const createObject = await super.obj(DBconfig, TableSchema).create(_methods);
        if (createObject) {
            const ModelName = this.getModelName();
            let newInstance = new models[ModelName]();
            Object.assign(newInstance, createObject);
            delete newInstance.obj;
            return newInstance;
        }
        else {
        }
    }
    static newInstance({ TableSchema, DBconfig, ModelName, dataToMerge }) {
        let newInstance = new models[ModelName]();
        Object.assign(newInstance, Object.assign({}, dataToMerge));
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
            instance = await this.create(Object.assign(defaultCreate, getArg));
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
        const DBconfig = this.getDBSchema();
        const TableSchema = this.getTableSchema();
        const _methods = [{ methodName: 'update', arguments: arg }];
        return await super.obj(DBconfig, TableSchema).update(_methods);
    }
}
_a = Model;
Model.object = ({ queryId = uniqueGenerator(), some = null, DBconfig, TableSchema }) => {
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
            return Object.assign(_a, _a.object({ queryId, DBconfig, TableSchema }));
        },
        execute: async () => {
            methods[queryId].push({ methodName: 'execute', arguments: null });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).execute(_methods);
        },
        update: async (args) => {
            methods[queryId].push({ methodName: 'update', arguments: args });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).update(_methods);
        },
        delete: async () => {
            methods[queryId].push({ methodName: 'delete', arguments: null });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).delete(_methods);
        },
        all: async () => {
            methods[queryId].push({ methodName: 'all', arguments: null });
            const _methods = methods[queryId];
            methods[queryId] = [];
            return await Reflect.get(_b, "obj", _a).call(_a, DBconfig, TableSchema).all(_methods);
        }
    };
};
