import { FieldKeysArray } from './field/fields.interface.js';
export class ModelReader {
    static read(modelClassRepresentation) {
        const classInstance = new modelClassRepresentation();
        const modelName = classInstance.getModelName();
        const fieldTypes = {};
        const fields = {};
        const attributes = {};
        Object.entries(classInstance).forEach(([fieldName, Field]) => {
            const type = Field === null || Field === void 0 ? void 0 : Field.constructor.name;
            if (FieldKeysArray.includes(type)) {
                fields[fieldName] = Field;
                if (!fieldTypes[type]) {
                    fieldTypes[type] = [];
                }
                fieldTypes[type].push(fieldName);
                Object.entries(Field).forEach(([FieldProperty, value]) => {
                    if (typeof value != "function") {
                        if (!attributes[FieldProperty]) {
                            attributes[FieldProperty] = [];
                        }
                        attributes[FieldProperty].push(fieldName);
                    }
                });
            }
        });
        return {
            modelName,
            fields,
            fieldTypes,
            attributes,
        };
    }
}
