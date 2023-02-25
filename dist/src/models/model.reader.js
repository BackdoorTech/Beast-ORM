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
    static read(modelClassRepresentation) {
        const classInstance = modelClassRepresentation;
        const fieldTypes = {};
        const attributes = {};
        const modelName = classInstance.getModelName();
        const fields = {};
        for (const [fieldName, Field] of Object.entries(classInstance)) {
            // const type = Field?.fieldName
            fields[fieldName] = Field || null;
        }
        return {
            modelName,
            fields,
            attributes,
            fieldTypes
        };
    }
}
