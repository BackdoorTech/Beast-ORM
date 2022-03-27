import { Model } from './model.js';
import { ModelReader } from './model.reader.js';
import { indexedDB } from './../connection/indexedDb/indexedb.js';
import { uncapitalize } from '../utils.js';
import { FieldType } from '../sql/query/interface.js';
export const models = {};
export const modelsConfig = {};
export class registerModel {
    static async register(entries) {
        const databaseSchema = {
            databaseName: entries.databaseName,
            version: entries.version,
            type: entries.type,
            stores: []
        };
        await entries.models.forEach(async (modelClassRepresentations) => {
            const ModelName = modelClassRepresentations.getModelName();
            models[ModelName] = modelClassRepresentations;
        });
        await entries.models.forEach(async (modelClassRepresentations, index) => {
            var _a, _b;
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
            });
            await Object.entries(fields).forEach(async ([fieldName, Field]) => {
                // dont register fields that is primary key and auto increment
                if (!((Field === null || Field === void 0 ? void 0 : Field.primaryKey) && (Field === null || Field === void 0 ? void 0 : Field.autoIncrement))) {
                    databaseSchema.stores[index].fields.push({
                        name: fieldName,
                        keyPath: fieldName,
                        options: {
                            unique: (Field === null || Field === void 0 ? void 0 : Field.unique) || false,
                            type: Field.type
                        },
                        className: Field === null || Field === void 0 ? void 0 : Field.fieldName,
                        fieldAttributes: Object.assign({}, Field)
                    });
                }
                // if(Field instanceof OneToOneField) {
                //   ModelEditor.addMethodOneToOneField(Field, fieldName, modelName, databaseSchema)
                // } else if (Field instanceof ForeignKey) {
                //   ModelEditor.addMethodForeignKey(Field, fieldName, modelName, databaseSchema)
                // } else if (Field instanceof ManyToManyField) {
                //   await ModelEditor.addMethodManyToManyField(Field, fieldName, modelName, databaseSchema)
                // }
            });
        });
        if (databaseSchema.type == 'indexedDB') {
            await indexedDB.migrate(databaseSchema);
        }
        await entries.models.forEach(async (modelClassRepresentations) => {
            const ModelName = modelClassRepresentations.getModelName();
            models[ModelName] = modelClassRepresentations;
            const tableSchema = databaseSchema.stores.find((e) => e.name == ModelName);
            modelsConfig[ModelName] = {
                DatabaseSchema: databaseSchema,
                TableSchema: tableSchema
            };
        });
    }
    static manyToManyRelationShip(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const currentModel = models[modelName];
        const foreignKeyFieldModelName = foreignKeyFieldModel.getModelName();
        const currentModelName = models[modelName].getModelName();
        const tableName = currentModelName + foreignKeyFieldModelName;
        const id = databaseSchema.stores.push({
            name: tableName,
            id: { keyPath: 'id', autoIncrement: true, type: FieldType.INT },
            fields: [
                {
                    name: 'iD' + foreignKeyFieldModelName,
                    keyPath: 'iD' + foreignKeyFieldModelName,
                    options: {
                        unique: false,
                        type: FieldType.INT
                    }
                },
                {
                    name: 'iD' + currentModelName,
                    keyPath: 'iD' + currentModelName,
                    options: {
                        unique: false,
                        type: FieldType.INT
                    }
                }
            ],
            attributes: {}
        });
        models[tableName] = generateGenericModel({
            DBSchema: databaseSchema,
            ModelName: tableName,
            TableSchema: databaseSchema.stores[id]
        });
    }
}
export class ModelEditor {
    static addMethodOneToOneField(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const modelNameLowCase = uncapitalize(modelName);
        foreignKeyFieldModel['prototype'][modelNameLowCase] = async function (body) {
            const obj = {};
            obj[FieldName] = this.getPrimaryKeyValue();
            const foreignModel = models[modelName];
            return await foreignModel.get(obj);
        };
    }
    static addMethodForeignKey(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const FunctionName = uncapitalize(modelName);
        foreignKeyFieldModel['prototype'][FunctionName + 'SetAll'] = async function () {
            const obj = {};
            obj[FieldName] = this.getPrimaryKeyValue();
            const currentModel = models[modelName];
            return await currentModel.filter(obj).execute();
        };
    }
    static async addMethodManyToManyField(foreignKeyField, FieldName, modelName, databaseSchema) {
        const foreignKeyFieldModel = foreignKeyField.model;
        FieldName = uncapitalize(FieldName);
        const currentModel = models[modelName];
        await registerModel.manyToManyRelationShip(foreignKeyField, FieldName, modelName, databaseSchema);
        currentModel['prototype'][FieldName + 'Add'] = async function (modelInstance) {
            if (modelInstance instanceof foreignKeyFieldModel) {
                await foreignKeyFieldModel.create(modelInstance);
            }
            else {
                throw ('Need to be instance of ' + foreignKeyFieldModel.getModelName());
            }
        };
    }
}
function generateGenericModel({ DBSchema, ModelName, TableSchema }) {
    class GenericModel {
    }
    Object.assign(Model).forEach((Field, value) => {
        GenericModel[Field] = value;
    });
    GenericModel.prototype = Model.prototype;
    GenericModel.prototype['getDBSchema'] = () => {
    };
    GenericModel.prototype['getModelName'] = () => {
    };
    GenericModel.prototype['getTableSchema'] = () => {
    };
    GenericModel['getDBSchema'] = () => {
    };
    GenericModel['getModelName'] = () => {
    };
    GenericModel['getTableSchema'] = () => {
    };
    return GenericModel;
}
