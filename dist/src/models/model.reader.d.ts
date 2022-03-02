import { FieldsMap, AttributesMap } from './field/fields.interface.js';
export declare class ModelReader {
    static read(modelClassRepresentation: any): {
        modelName: string;
        fields: {
            [key: string]: any;
        };
        fieldTypes: FieldsMap<"CharField" | "JsonField", string[]>;
        attributes: AttributesMap<"maxLength" | "minLength" | "choices" | "primaryKey", string[]>;
    };
}
