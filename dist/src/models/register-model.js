import { Model } from './model.js';
import { LocalStorageModelReader, ModelReader } from './model.reader.js';
import { OneToOneField, ForeignKey, ManyToManyField } from './field/allFields.js';
import { uncapitalize, uniqueGenerator } from '../utils.js';
import { FieldType } from '../sql/query/interface.js';
import { ModelMigrations } from './mode-migrations.js';
import { ModelAPIRequest } from './model-manager.js';
import { transactionOnCommit } from '../triggers/transaction.js';
import { IndexedDB } from '../connection/indexedDb/connector.js';
export const models = {};
export const modelsConfig = {};
export const modelsLocalStorage = {};
export const modelsConfigLocalStorage = {};
export function migrate(register) {
    if (register.type == 'indexedDB') {
        registerModel.register(register);
    }
    else if (register.type == 'localStorage') {
        registerLocalStorage.register(register);
    }
}
export class registerModel {
    static async register(entries) {
        var _a, _b, _c;
        const databaseSchema = {
            databaseName: entries.databaseName || uniqueGenerator(),
            version: entries.version,
            type: entries.type,
            stores: []
        };
        for (const modelClassRepresentations of entries.models) {
            const ModelName = modelClassRepresentations.getModelName();
            models[ModelName] = modelClassRepresentations;
        }
        let index = 0;
        for (const modelClassRepresentations of entries.models) {
            const { fields, modelName, attributes, fieldTypes } = ModelReader.read(modelClassRepresentations);
            const idFieldName = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.primaryKey) === null || _a === void 0 ? void 0 : _a.shift();
            databaseSchema.stores.push({
                name: modelName,
                id: {
                    keyPath: idFieldName || 'id',
                    autoIncrement: fields[idFieldName] ? ((_b = fields[idFieldName]) === null || _b === void 0 ? void 0 : _b.primaryKey) == true : true,
                    type: FieldType.INT
                },
                attributes: attributes,
                fields: [],
                fieldTypes
            });
            for (const [fieldName, Field] of Object.entries(fields)) {
                // dont register fields that is primary key and auto increment
                if (!((Field === null || Field === void 0 ? void 0 : Field.primaryKey) && (Field === null || Field === void 0 ? void 0 : Field.autoIncrement)) && !((_c = fieldTypes['ManyToManyField']) === null || _c === void 0 ? void 0 : _c.includes(fieldName))) {
                    const removeReferenceField = Object.assign({}, Field);
                    if (removeReferenceField === null || removeReferenceField === void 0 ? void 0 : removeReferenceField.model) {
                        removeReferenceField.model = removeReferenceField.model.getModelName();
                    }
                    databaseSchema.stores[index].fields.push({
                        name: fieldName,
                        keyPath: fieldName,
                        options: {
                            unique: (Field === null || Field === void 0 ? void 0 : Field.unique) || false,
                            type: Field.type
                        },
                        className: Field === null || Field === void 0 ? void 0 : Field.fieldName,
                        fieldAttributes: Object.assign({}, removeReferenceField)
                    });
                }
                if (Field instanceof OneToOneField) {
                    await ModelEditor.addMethodOneToOneField(Field, fieldName, modelName, databaseSchema);
                }
                else if (Field instanceof ForeignKey) {
                    await ModelEditor.addMethodForeignKey(Field, fieldName, modelName, databaseSchema);
                }
                else if (Field instanceof ManyToManyField) {
                    await ModelEditor.addMethodManyToManyField(Field, fieldName, modelName, databaseSchema);
                }
            }
            index++;
        }
        let tableSchema_;
        for (const modelClassRepresentations of entries.models) {
            const ModelName = modelClassRepresentations.getModelName();
            models[ModelName] = modelClassRepresentations;
            const tableSchema = databaseSchema.stores.find((e) => e.name == ModelName);
            tableSchema_ = tableSchema;
            modelsConfig[ModelName] = {
                DatabaseSchema: databaseSchema,
                TableSchema: tableSchema
            };
            ModelMigrations.prepare(databaseSchema.databaseName);
            transactionOnCommit.prepare(modelClassRepresentations);
        }
        if (databaseSchema.type == 'indexedDB') {
            await IndexedDB.run(databaseSchema);
            await ModelAPIRequest.obj(databaseSchema, tableSchema_).migrate();
            ModelMigrations.migrationsState(databaseSchema.databaseName, true);
        }
    }
    static manyToManyRelationShip(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const currentModel = models[modelName];
        const foreignKeyFieldModelName = foreignKeyFieldModel.getModelName();
        const currentModelName = models[modelName].getModelName();
        const tableName = currentModelName + foreignKeyFieldModelName;
        const num = databaseSchema.stores.push({
            name: tableName,
            id: { keyPath: 'id', autoIncrement: true, type: FieldType.INT },
            fields: [
                {
                    name: 'iD' + foreignKeyFieldModelName,
                    keyPath: 'iD' + foreignKeyFieldModelName,
                    options: {
                        unique: false,
                        type: FieldType.INT
                    },
                    className: 'IntegerField'
                },
                {
                    name: 'iD' + currentModelName,
                    keyPath: 'iD' + currentModelName,
                    options: {
                        unique: false,
                        type: FieldType.INT
                    },
                    className: 'IntegerField'
                }
            ],
            attributes: {},
            fieldTypes: {
                IntegerField: ['iD' + foreignKeyFieldModelName, 'iD' + currentModelName]
            }
        });
        const id = num - 1;
        models[tableName] = generateGenericModel({
            DBSchema: databaseSchema,
            ModelName: tableName,
            TableSchema: databaseSchema.stores[id]
        });
        return generateGenericModel({
            DBSchema: databaseSchema,
            ModelName: tableName,
            TableSchema: databaseSchema.stores[id]
        });
    }
}
async function cachedValue(Model) {
    const emptyFields = Model.getEmptyFields();
    Model.getEmptyFields = function () {
        return emptyFields;
    };
    const getModelName = Model.getModelName();
    Model.getModelName = function () {
        return getModelName;
    };
}
export class registerLocalStorage {
    static async register(entries) {
        const databaseSchema = {
            databaseName: entries.databaseName,
            version: entries.version,
            type: 'localStorage',
            stores: []
        };
        for (const modelClassRepresentations of entries.models) {
            const ModelName = modelClassRepresentations.getModelName();
            modelsLocalStorage[ModelName] = modelClassRepresentations;
        }
        let index = 0;
        for (const modelClassRepresentations of entries.models) {
            const { fields, modelName, attributes, fieldTypes } = LocalStorageModelReader.read(modelClassRepresentations);
            // const idFieldName = attributes?.primaryKey?.shift()
            databaseSchema.stores.push({
                name: modelName,
                id: {
                    keyPath: modelName,
                    type: FieldType.VARCHAR,
                    autoIncrement: false
                },
                attributes: attributes,
                fields: [],
                fieldTypes
            });
            for (const [fieldName, Field] of Object.entries(fields)) {
                databaseSchema.stores[index].fields.push({
                    name: fieldName,
                    keyPath: fieldName,
                    options: {
                        unique: false,
                        type: null
                    },
                    className: Field === null || Field === void 0 ? void 0 : Field.fieldName,
                    fieldAttributes: Object.assign({}, Field)
                });
            }
            index++;
        }
        for (const modelClassRepresentations of entries.models) {
            const ModelName = modelClassRepresentations.getModelName();
            const tableSchema = databaseSchema.stores.find((e) => e.name == ModelName);
            modelClassRepresentations.getDBSchema = () => {
                return databaseSchema;
            };
            modelClassRepresentations.getTableSchema = () => {
                return tableSchema;
            };
            modelsConfigLocalStorage[ModelName] = {
                DatabaseSchema: databaseSchema,
                TableSchema: tableSchema
            };
            modelsLocalStorage[ModelName] = modelClassRepresentations;
        }
    }
}
export class ModelEditor {
    static addMethodOneToOneField(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const currentModel = models[modelName];
        foreignKeyFieldModel['prototype'][modelName] = async function (body) {
            const foreignModel = currentModel;
            const TableSchema = foreignModel.getTableSchema();
            const obj = {};
            obj[TableSchema.id.keyPath] = this.getPrimaryKeyValue();
            return await foreignModel.get(obj);
        };
        currentModel['prototype'][foreignKeyFieldModel['name']] = async function () {
            const foreignModel = foreignKeyFieldModel;
            let params = {};
            const TableSchema = foreignModel.getTableSchema();
            params[TableSchema.id.keyPath] = this.getPrimaryKeyValue();
            return await foreignModel.get(params);
        };
    }
    static addMethodForeignKey(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const currentModel = models[modelName];
        const FunctionName = uncapitalize(modelName);
        foreignKeyFieldModel['prototype'][FunctionName + '_setAll'] = async function () {
            const obj = {};
            obj[FieldName] = this.getPrimaryKeyValue();
            const currentModel = models[modelName];
            return await currentModel.filter(obj).execute();
        };
        foreignKeyFieldModel['prototype'][FunctionName + '_setAdd'] = async function (arg) {
            const reporter = this;
            arg[FieldName] = reporter;
            return currentModel['create'](arg);
        };
        currentModel['prototype'][foreignKeyFieldModel.getModelName()] = async function () {
            const TableSchema = foreignKeyFieldModel.getTableSchema();
            const obj = {};
            obj[TableSchema.id.keyPath] = this[FieldName];
            return foreignKeyFieldModel.filter(obj).execute();
        };
    }
    static async addMethodManyToManyField(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        FieldName = FieldName;
        const currentModel = models[modelName];
        const middleTable = await registerModel.manyToManyRelationShip(foreignKeyField, FieldName, modelName, databaseSchema);
        currentModel['prototype'][FieldName + '_add'] = async function (modelInstances) {
            if (modelInstances.constructor.name != 'Array') {
                modelInstances = [modelInstances];
            }
            for (const modelInstance of modelInstances) {
                if (modelInstance instanceof foreignKeyFieldModel) {
                    let params = {};
                    params[`iD${currentModel.getModelName()}`] = this.getPrimaryKeyValue();
                    params[`iD${modelInstance.getModelName()}`] = modelInstance.getPrimaryKeyValue();
                    await middleTable['create'](params);
                }
                else {
                    throw ('Need to be instance of ' + foreignKeyFieldModel.getModelName());
                }
            }
        };
        currentModel['prototype'][FieldName] = function () {
            let _model = this;
            return {
                async all() {
                    let params = {};
                    params[`iD${_model.getModelName()}`] = _model.getPrimaryKeyValue();
                    const middleTableResult = await middleTable['filter'](params).execute();
                    foreignKeyField.model;
                    return middleTableResult;
                }
            };
        };
        currentModel['prototype'][FieldName + '_all'] = async function () {
            let _model = this;
            let params = {};
            let result = [];
            params[`iD${_model.getModelName()}`] = _model.getPrimaryKeyValue();
            const middleTableResult = await middleTable['filter'](params).execute();
            let ids;
            if (middleTableResult) {
                const TableSchema = foreignKeyField.model.getTableSchema();
                ids = middleTableResult.map((e) => {
                    return e[`iD${foreignKeyField.model.name}`];
                });
                let params = {};
                for (const id of ids) {
                    try {
                        params[TableSchema.id.keyPath] = id;
                        const row = await foreignKeyField.model.get(params);
                        result.push(row);
                    }
                    catch (error) {
                    }
                }
            }
            return result;
        };
        foreignKeyField.model['prototype'][uncapitalize(modelName) + '_set_all'] = async function () {
            let _model = this;
            let params = {};
            let result = [];
            params[`iD${_model.getModelName()}`] = _model.getPrimaryKeyValue();
            const middleTableResult = await middleTable['filter'](params).execute();
            let ids;
            if (middleTableResult) {
                const TableSchema = currentModel.getTableSchema();
                ids = middleTableResult.map((e) => {
                    return e[`iD${modelName}`];
                });
                let params = {};
                for (const id of ids) {
                    try {
                        params[TableSchema.id.keyPath] = id;
                        const row = await currentModel.get(params);
                        result.push(row);
                    }
                    catch (error) {
                    }
                }
            }
            return result;
        };
    }
}
function generateGenericModel({ DBSchema, ModelName, TableSchema }) {
    class GenericModel extends Model {
    }
    for (const [Field, value] of Object.entries(Model)) {
        GenericModel[Field] = value;
    }
    // GenericModel.prototype = Model.prototype
    GenericModel.prototype['getDBSchema'] = () => {
        return DBSchema;
    };
    GenericModel.prototype['getModelName'] = () => {
        return ModelName;
    };
    GenericModel.prototype['getTableSchema'] = () => {
        return TableSchema;
    };
    GenericModel['getDBSchema'] = () => {
        return DBSchema;
    };
    GenericModel['getModelName'] = () => {
        return ModelName;
    };
    GenericModel['getTableSchema'] = () => {
        return TableSchema;
    };
    return GenericModel;
}
