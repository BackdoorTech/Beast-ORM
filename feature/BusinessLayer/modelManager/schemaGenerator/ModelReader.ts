import { FieldsMap, FieldKeys, FieldKeysArray, AttributesMap, FieldAttributesKeys } from './ModalReader.type'

export class ModelReader {
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
  static read(modelClassRepresentation) {
    const classInstance = new modelClassRepresentation();
    let {
      modelName,
      fields,
      fieldTypes,
      attributes,
      fieldNames,
    } = this.initializeDataStructures();

    modelName = this.getModelName(modelClassRepresentation)

    for (const [fieldName, Field] of Object.entries(classInstance)) {
      this.processField(classInstance, fieldName, Field, fieldTypes, attributes, fieldNames, fields);
    }

    return {
      modelName,
      fields,
      fieldTypes,
      attributes,
      fieldNames,
    };
  }

  /**
   * Reads the model class representation and extracts information about class model name
   *
   * @param {typeof models.Model} modelClassRepresentation - The class representation of the model.
   * @returns {String}  - Model class name
  */
  static getModelName (modelClassRepresentation) {
    return modelClassRepresentation.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
  }

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
  private static initializeDataStructures() {
    return {
      modelName: '',
      fields: {},
      fieldTypes: {},
      attributes: {},
      fieldNames: [],
    };
  }

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
  private static processField(classInstance, fieldName, Field, fieldTypes, attributes, fieldNames, fields) {
    const type = Field?.fieldName;
    const knownFieldType = this.isKnownFieldType(type);

    fieldNames.push(fieldName);
    fields[fieldName] = Field;

    if (knownFieldType) {
      this.addFieldToType(fieldTypes, type, fieldName);
      this.processFieldAttributes(Field, attributes, fieldName);
    } else {
      this.addFieldToType(fieldTypes, 'Unknown', fieldName);
    }
  }

  /**
   * Checks if a field type is known (e.g., part of FieldKeysArray).
   *
   * @param {string} type - The field type to check.
   * @returns {boolean} - True if the field type is known; false otherwise.
   */
  private static isKnownFieldType(type) {
    return FieldKeysArray.includes(type);
  }

  /**
   * Adds a field to the specified type in the fieldTypes map.
   *
   * @param {FieldsMap<FieldKeys, string[]>} fieldTypes - A map of field types.
   * @param {string} type - The type to which the field belongs.
   * @param {string} fieldName - The name of the field.
   */
  private static addFieldToType(fieldTypes, type, fieldName) {
    if (!fieldTypes[type]) {
      fieldTypes[type] = [];
    }
    fieldTypes[type].push(fieldName);
  }

  /**
   * Processes field attributes and adds the field to the appropriate attribute map.
   *
   * @param {any} Field - The field to process.
   * @param {AttributesMap<FieldAttributesKeys, string[]>} attributes - A map of attributes.
   * @param {string} fieldName - The name of the field.
   */
  private static processFieldAttributes(Field, attributes, fieldName) {
    for (const [FieldProperty, value] of Object.entries(Field)) {
      if (typeof value !== 'function') {
        this.addFieldToAttribute(attributes, FieldProperty, fieldName);
      }
    }
  }

  /**
   * Adds a field to the specified attribute in the attributes map.
   *
   * @param {AttributesMap<FieldAttributesKeys, string[]>} attributes - A map of attributes.
   * @param {FieldAttributesKeys} FieldProperty - The attribute to which the field belongs.
   * @param {string} fieldName - The name of the field.
   */
  private static addFieldToAttribute(attributes, FieldProperty, fieldName) {
    if (!attributes[FieldProperty]) {
      attributes[FieldProperty] = [];
    }
    attributes[FieldProperty].push(fieldName);
  }
}
