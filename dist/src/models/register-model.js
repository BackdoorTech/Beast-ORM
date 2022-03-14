import { ModelReader } from './model.reader.js';
import { indexedDB } from './../connection/indexedDb/indexedb.js';
import { OneToOneField, ForeignKey } from './field/allFields.js';
import { uncapitalize } from '../utils.js';
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
        await entries.models.forEach(async (modelClassRepresentations, index) => {
            var _a, _b;
            const { fields, modelName, attributes, fieldTypes } = ModelReader.read(modelClassRepresentations);
            const idFieldName = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.primaryKey) === null || _a === void 0 ? void 0 : _a.shift();
            databaseSchema.stores.push({
                name: modelName,
                id: {
                    keyPath: idFieldName || 'id',
                    autoIncrement: fields[idFieldName] ? ((_b = fields[idFieldName]) === null || _b === void 0 ? void 0 : _b.primaryKey) == true : true
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
                        }
                    });
                }
                if (Field instanceof OneToOneField) {
                    ModelEditor.addMethodOneToOneField(Field, fieldName, modelName);
                }
                else if (Field instanceof ForeignKey) {
                    ModelEditor.addMethodForeignKey(Field, fieldName, modelName);
                }
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
}
export class ModelEditor {
    static addMethodOneToOneField(foreignKeyField, FieldName, modelName) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const modelNameLowCase = uncapitalize(modelName);
        foreignKeyFieldModel['prototype'][modelNameLowCase] = async function (body) {
            const obj = {};
            obj[FieldName] = this.getPrimaryKeyValue();
            const foreignModel = models[modelName];
            return await foreignModel.get(obj);
        };
    }
    static addMethodForeignKey(foreignKeyField, FieldName, modelName) {
        const foreignKeyFieldModel = foreignKeyField.model;
        const FunctionName = uncapitalize(modelName);
        foreignKeyFieldModel['prototype'][FunctionName + 'SetAll'] = async function () {
            const obj = {};
            obj[FieldName] = this.getPrimaryKeyValue();
            const foreignModel = models[modelName];
            console.log(obj, 'obj');
            return await foreignModel.filter(obj).execute();
        };
    }
}
