import { FieldsMap, AttributesMap } from './field/fields.interface.js';
export declare class ModelReader {
    static id({ attributes }: {
        attributes: any;
    }): any;
    static read(modelClassRepresentation: any): {
        modelName: any;
        fields: {
            [key: string]: any;
        };
        fieldTypes: FieldsMap<"CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "IntegerField" | "TextField" | "BooleanField" | "OneToOneField" | "ForeignKey" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField" | "Unknown", string[]>;
        attributes: AttributesMap<"maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "type" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
        fieldNames: any[];
        id: any;
    };
}
export declare class LocalStorageModelReader {
    static read(modelClassRepresentation: any, ignoreFieldsStartWidth: string[]): {
        modelName: any;
        fields: {
            [key: string]: any;
        };
        attributes: AttributesMap<"maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "type" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
        fieldTypes: FieldsMap<"CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "IntegerField" | "TextField" | "BooleanField" | "OneToOneField" | "ForeignKey" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField" | "Unknown", string[]>;
    };
}
