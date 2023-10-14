export declare class ModelReader {
    /**
     * Reads the model class representation and extracts information about its fields, field types, attributes, and field names.
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
    static read(modelClassRepresentation: any): {
        modelName: string;
        fields: {};
        fieldTypes: {};
        attributes: {};
        fieldNames: any[];
    };
    /**
     * Reads the model class representation and extracts information about class model name
     *
     * @param {typeof models.Model} modelClassRepresentation - The class representation of the model.
     * @returns {String}  - Model class name
    */
    static getModelName(modelClassRepresentation: any): any;
    /**
     * Initializes data structures for storing model information.
     *
     * @returns {{
     *   modelName: string,
     *   fields: { [key: string]: any },
     *   fieldTypes: FieldsMap<FieldKeys, string[]>,
     *   attributes: AttributesMap<FieldAttributesKeys, string[]>,
     *   fieldNames: string[],
     * }} - An object containing initialized data structures.
     */
    private static initializeDataStructures;
    /**
     * Processes a field within the model and updates the data structures accordingly.
     *
     * @param {Object} classInstance - An instance of the model class.
     * @param {string} fieldName - The name of the field.
     * @param {any} Field - The field itself.
     * @param {FieldsMap<FieldKeys, string[]>} fieldTypes - A map of field types.
     * @param {AttributesMap<FieldAttributesKeys, string[]>} attributes - A map of attributes.
     * @param {string[]} fieldNames - An array of field names.
     * @param {Object} fields - An object containing field information.
     */
    private static processField;
    /**
     * Checks if a field type is known (e.g., part of FieldKeysArray).
     *
     * @param {string} type - The field type to check.
     * @returns {boolean} - True if the field type is known; false otherwise.
     */
    private static isKnownFieldType;
    /**
     * Adds a field to the specified type in the fieldTypes map.
     *
     * @param {FieldsMap<FieldKeys, string[]>} fieldTypes - A map of field types.
     * @param {string} type - The type to which the field belongs.
     * @param {string} fieldName - The name of the field.
     */
    private static addFieldToType;
    /**
     * Processes field attributes and adds the field to the appropriate attribute map.
     *
     * @param {any} Field - The field to process.
     * @param {AttributesMap<FieldAttributesKeys, string[]>} attributes - A map of attributes.
     * @param {string} fieldName - The name of the field.
     */
    private static processFieldAttributes;
    /**
     * Adds a field to the specified attribute in the attributes map.
     *
     * @param {AttributesMap<FieldAttributesKeys, string[]>} attributes - A map of attributes.
     * @param {FieldAttributesKeys} FieldProperty - The attribute to which the field belongs.
     * @param {string} fieldName - The name of the field.
     */
    private static addFieldToAttribute;
}
