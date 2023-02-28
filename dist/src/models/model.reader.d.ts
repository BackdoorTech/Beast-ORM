import { FieldsMap, AttributesMap } from './field/fields.interface.js';
export declare class ModelReader {
    static read(modelClassRepresentation: any): {
        modelName: string;
        fields: {
            [key: string]: any;
        };
        fieldTypes: FieldsMap<"CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "IntegerField" | "TextField" | "BooleanField" | "OneToOneField" | "ForeignKey" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField", string[]>;
        attributes: AttributesMap<"type" | "maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
    };
}
export declare class LocalStorageModelReader {
    static read(modelClassRepresentation: any): {
        modelName: string;
        fields: {
            [key: string]: any;
        };
        attributes: AttributesMap<"type" | "maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
        fieldTypes: FieldsMap<"CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "IntegerField" | "TextField" | "BooleanField" | "OneToOneField" | "ForeignKey" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField", string[]>;
    };
}
