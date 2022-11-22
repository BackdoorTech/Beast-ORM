import { FieldsMap, AttributesMap } from './field/fields.interface.js';
export declare class ModelReader {
    static read(modelClassRepresentation: any): {
        modelName: string;
        fields: {
            [key: string]: any;
        };
        fieldTypes: FieldsMap<"ForeignKey" | "IntegerField" | "CharField" | "JsonField" | "AutoField" | "BigIntegerField" | "DateField" | "TextField" | "BooleanField" | "OneToOneField" | "ManyToManyField" | "indexedDBJsonField" | "indexedDBArrayField" | "DateTimeField", string[]>;
        attributes: AttributesMap<"maxLength" | "minLength" | "choices" | "primaryKey" | "unique" | "autoIncrement" | "type" | "model" | "blank" | "default" | "onDelete" | "foreignKey", string[]>;
    };
}
