import { FieldKeysArray } from './field/fields.interface.js';
export class ModelReader {
    static id({ attributes }) {
        var _a;
        // Check if the attributes object and primaryKey array exist,
        // then return the first element of the primaryKey array,
        // otherwise, return 'id' as the default value.
        return ((_a = attributes === null || attributes === void 0 ? void 0 : attributes.primaryKey) === null || _a === void 0 ? void 0 : _a[0]) || 'id';
    }
    static read(modelClassRepresentation) {
        const classInstance = new modelClassRepresentation();
        const modelName = classInstance.getModelName();
        const fieldTypes = {};
        const fields = {};
        const attributes = {};
        const fieldNames = [];
        for (const [fieldName, Field] of Object.entries(classInstance)) {
            const type = Field === null || Field === void 0 ? void 0 : Field.fieldName;
            if (FieldKeysArray.includes(type)) {
                fieldNames.push(fieldName);
                fields[fieldName] = Field;
                if (!fieldTypes[type]) {
                    fieldTypes[type] = [];
                }
                fieldTypes[type].push(fieldName);
                for (const [FieldProperty, value] of Object.entries(Field)) {
                    if (typeof value != "function") {
                        if (!attributes[FieldProperty]) {
                            attributes[FieldProperty] = [];
                        }
                        attributes[FieldProperty].push(fieldName);
                    }
                }
            }
            else {
                fields[fieldName] = Field;
                if (!fieldTypes["Unknown"]) {
                    fieldTypes["Unknown"] = [];
                }
                fieldTypes["Unknown"].push(fieldName);
            }
        }
        const id = this.id({ attributes });
        return {
            modelName,
            fields,
            fieldTypes,
            attributes,
            fieldNames,
            id
        };
    }
}
export class LocalStorageModelReader {
    static read(modelClassRepresentation, ignoreFieldsStartWidth) {
        const classInstance = modelClassRepresentation;
        const fieldTypes = {};
        const attributes = {};
        const modelName = classInstance.getModelName();
        const fields = {};
        for (const [fieldName, Field] of Object.entries(classInstance)) {
            const ignore = ignoreFieldsStartWidth.find(e => fieldName.startsWith(e));
            if (!ignore) {
                const type = Field === null || Field === void 0 ? void 0 : Field.fieldName;
                if (FieldKeysArray.includes(type)) {
                    fields[fieldName] = Field;
                    if (!fieldTypes[type]) {
                        fieldTypes[type] = [];
                    }
                    fieldTypes[type].push(fieldName);
                    for (const [FieldProperty, value] of Object.entries(Field)) {
                        if (typeof value != "function") {
                            if (!attributes[FieldProperty]) {
                                attributes[FieldProperty] = [];
                            }
                            attributes[FieldProperty].push(fieldName);
                        }
                    }
                }
                else {
                    fields[fieldName] = Field;
                    if (!fieldTypes["Unknown"]) {
                        fieldTypes["Unknown"] = [];
                    }
                    fieldTypes["Unknown"].push(fieldName);
                }
            }
        }
        return {
            modelName,
            fields,
            attributes,
            fieldTypes
        };
    }
}
