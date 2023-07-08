import { FieldKeysArray } from './field/fields.interface.js';
export class ModelReader {
    static read(modelClassRepresentation) {
        const classInstance = new modelClassRepresentation();
        const modelName = classInstance.getModelName();
        const fieldTypes = {};
        const fields = {};
        const attributes = {};
        for (const [fieldName, Field] of Object.entries(classInstance)) {
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
        return {
            modelName,
            fields,
            fieldTypes,
            attributes,
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
