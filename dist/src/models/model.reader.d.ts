import { FieldsMap, AttributesMap } from './field/fields.interface.js';
export declare class ModelReader {
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
    static read(modelClassRepresentation: any): {
        modelName: any;
        fields: {
            [key: string]: any;
        };
        fieldTypes: FieldsMap<"CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "IntegerField" | "TextField" | "BooleanField" | "OneToOneField" | "ForeignKey" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField" | "Unknown", string[]>;
        attributes: AttributesMap<"maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "type" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
        fieldNames: any[];
    };
}
export declare class LocalStorageModelReader {
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
    static read(modelClassRepresentation: any, ignoreFieldsStartWidth: string[]): {
        modelName: any;
        fields: {
            [key: string]: any;
        };
        attributes: AttributesMap<"maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "type" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
        fieldTypes: FieldsMap<"CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "IntegerField" | "TextField" | "BooleanField" | "OneToOneField" | "ForeignKey" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField" | "Unknown", string[]>;
    };
}
