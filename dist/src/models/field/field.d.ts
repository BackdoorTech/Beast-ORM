import { FieldKeys } from "./fields.interface";
export declare class field {
    fieldName: FieldKeys;
    primaryKey?: any;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    choices?: any[] | undefined;
    type: number;
    blank?: boolean;
    default?: any;
    unique?: boolean;
    foreignKey?: boolean;
    model?: field;
    get field(): boolean;
    isNull(value: any): boolean;
    rules(field: field, value: any): boolean;
}
