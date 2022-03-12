import { ModelReader } from './model.reader.js';
import { indexedDB } from './../connection/indexedDb/indexedb.js';
export const models = {};
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
            });
        });
        if (databaseSchema.type == 'indexeddb') {
            await indexedDB.migrate(databaseSchema);
        }
        await entries.models.forEach(async (modelClassRepresentations) => {
            modelClassRepresentations.setDBConfig(databaseSchema);
            const ModelName = modelClassRepresentations.getModelName();
            models[ModelName] = modelClassRepresentations;
        });
    }
}
