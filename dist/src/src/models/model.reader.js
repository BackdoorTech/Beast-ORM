import { FieldKeysArray } from './field/fields.interface.js';
export class ModelReader {
    /**
     * Reads the model class representation and extracts information about its fields,
     * field types, attributes, and primary key.
     *
     * @param {typeof models.Model} modelClassRepresentation - The class representation of the model.
     * @returns {{
     *   modelName: string,
      *   fields: { [key: string]: any },
      *   fieldTypes: FieldsMap<FieldKeys, string[]>,
      *   attributes: AttributesMap<FieldAttributesKeys, string[]>,
      *   fieldNames: string[]
      * }} - An object containing extracted model information.
      */
    static read(modelClassRepresentation) {
        // Create an instance of the model class.
        const classInstance = new modelClassRepresentation();
        // Initialize data structures to store information about fields, types, attributes, etc.
        const modelName = classInstance.getModelName();
        const fieldTypes = {};
        const fields = {};
        const attributes = {};
        const fieldNames = [];
        // Iterate over the properties of the model class.
        for (const [fieldName, Field] of Object.entries(classInstance)) {
            // Get the type of the field.
            const type = Field === null || Field === void 0 ? void 0 : Field.fieldName;
            // Check if the type is a known field key.
            if (FieldKeysArray.includes(type)) {
                fieldNames.push(fieldName);
                fields[fieldName] = Field;
                // If the field type is not already defined, initialize it.
                if (!fieldTypes[type]) {
                    fieldTypes[type] = [];
                }
                // Store the field under its type.
                fieldTypes[type].push(fieldName);
                // Iterate over Field properties to identify non-function attributes.
                for (const [FieldProperty, value] of Object.entries(Field)) {
                    if (typeof value != "function") {
                        // If the attribute is not already defined, initialize it.
                        if (!attributes[FieldProperty]) {
                            attributes[FieldProperty] = [];
                        }
                        // Store the field under its attribute.
                        attributes[FieldProperty].push(fieldName);
                    }
                }
            }
            else {
                // If the type is unknown, categorize it as "Unknown".
                fields[fieldName] = Field;
                if (!fieldTypes["Unknown"]) {
                    fieldTypes["Unknown"] = [];
                }
                // Store the field under "Unknown".
                fieldTypes["Unknown"].push(fieldName);
            }
        }
        // Return the extracted model information.
        return {
            modelName,
            fields,
            fieldTypes,
            attributes,
            fieldNames
        };
    }
}
export class LocalStorageModelReader {
    /**
   * Reads the model class representation and extracts information about its fields,
   * field types, attributes.
   *
   * @param {typeof models.Model} modelClassRepresentation - The class representation of the model.
   * @returns {{
   *   modelName: string,
   *   fields: { [key: string]: any },
   *   fieldTypes: FieldsMap<FieldKeys, string[]>,
   *   attributes: AttributesMap<FieldAttributesKeys, string[]>,
   *   fieldNames: string[],
   * }} - An object containing extracted model information.
   */
    static read(modelClassRepresentation, ignoreFieldsStartWidth) {
        // Create an instance of the model class.
        const classInstance = modelClassRepresentation;
        // Initialize data structures to store information about fields, types, attributes, etc.
        const fieldTypes = {};
        const attributes = {};
        const modelName = classInstance.getModelName();
        const fields = {};
        // Iterate over the properties of the model class.
        for (const [fieldName, Field] of Object.entries(classInstance)) {
            const ignore = ignoreFieldsStartWidth.find(e => fieldName.startsWith(e));
            if (!ignore) {
                const type = Field === null || Field === void 0 ? void 0 : Field.fieldName;
                // Check if the type is a known field key.
                if (FieldKeysArray.includes(type)) {
                    fields[fieldName] = Field;
                    // If the field type is not already defined, initialize it.
                    if (!fieldTypes[type]) {
                        fieldTypes[type] = [];
                    }
                    // Store the field under its type.
                    fieldTypes[type].push(fieldName);
                    // Iterate over Field properties to identify non-function attributes.
                    for (const [FieldProperty, value] of Object.entries(Field)) {
                        if (typeof value != "function") {
                            // If the attribute is not already defined, initialize it.
                            if (!attributes[FieldProperty]) {
                                attributes[FieldProperty] = [];
                            }
                            // Store the field under its attribute.
                            attributes[FieldProperty].push(fieldName);
                        }
                    }
                }
                else {
                    // If the type is unknown, categorize it as "Unknown".
                    fields[fieldName] = Field;
                    if (!fieldTypes["Unknown"]) {
                        fieldTypes["Unknown"] = [];
                    }
                    // Store the field under "Unknown".
                    fieldTypes["Unknown"].push(fieldName);
                }
            }
        }
        // Return the extracted model information.
        return {
            modelName,
            fields,
            attributes,
            fieldTypes
        };
    }
}
