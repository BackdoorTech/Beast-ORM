import { ModelReader } from './model.reader.js';
export class registerModel {
    static register(entries) {
        const databaseSchema = {
            databaseName: entries.databaseName,
            version: entries.version,
            type: entries.type,
            stores: []
        };
        entries.models.forEach((modelClassRepresentations, index) => {
            var _a, _b;
            const { fields, modelName, attributes, fieldTypes } = ModelReader.read(modelClassRepresentations);
            databaseSchema.stores.push({
                name: modelName,
                id: {
                    keyPath: ((_a = attributes === null || attributes === void 0 ? void 0 : attributes.primaryKey) === null || _a === void 0 ? void 0 : _a.shift()) || 'id',
                    autoIncrement: ((_b = attributes === null || attributes === void 0 ? void 0 : attributes.primaryKey) === null || _b === void 0 ? void 0 : _b.shift()) == undefined
                },
                fields: [],
            });
            Object.entries(fields).forEach(([fieldName, Field]) => {
                databaseSchema.stores[index].fields.push({
                    name: fieldName,
                    keyPath: fieldName,
                    options: {
                        unique: (Field === null || Field === void 0 ? void 0 : Field.unique) || false,
                        type: Field.type
                    }
                });
            });
        });
        entries.models.forEach((modelClassRepresentations) => {
            modelClassRepresentations.setDBConfig(databaseSchema);
        });
    }
}
