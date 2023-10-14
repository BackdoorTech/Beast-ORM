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
}
export declare enum FieldType {
    AUTO = 0,
    INT = 1,
    BIGINT = 2,
    TEXT = 3,
    VARCHAR = 4,
    DATE = 5,
    BOOL = 6,
    CHAR = 7,
    JSON = 8,
    ARRAY = 9
}
export declare const FieldKeysArray: readonly ["CharField", "JsonField", "AutoField", "BigIntegerField", "DateField", "IntegerField", "TextField", "BooleanField", "OneToOneField", "ForeignKey", "ManyToManyField", "indexedDBJsonField", "indexedDBArrayField", "DateTimeField", "DateField", "Unknown"];
export declare const AttributesArray: readonly ["maxLength", "minLength", "choices", "primaryKey", "unique", "autoIncrement", "type", "choices", "model", "blank", "default", "onDelete", "foreignKey"];
export type FieldKeys = typeof FieldKeysArray[number];
export type FieldsMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export type FieldAttributesKeys = typeof AttributesArray[number];
export type AttributesMap<K extends string | number | symbol, T> = {
    [P in K]?: T;
};
export interface CharFieldParams {
    maxLength?: number;
    minLength?: number;
    primaryKey?: boolean;
    choices?: any[] | undefined;
    unique?: boolean;
    blank?: boolean;
    default?: any;
}
export interface TextFieldParams {
    maxLength?: number;
    minLength?: number;
    primaryKey?: boolean;
    unique?: boolean;
    default?: any;
    blank?: boolean;
}
export interface IntegerFieldParams {
    primaryKey?: boolean;
    unique?: boolean;
    default?: any;
    blank?: boolean;
}
export interface BigIntegerFieldParams {
    primaryKey?: boolean;
    unique?: boolean;
    default?: any;
    blank?: boolean;
}
export interface AutoFieldParams {
    primaryKey?: boolean;
}
export interface IndexedDBJsonFieldParams {
    unique?: boolean;
    blank?: boolean;
    null?: boolean;
    default?: any;
}
export interface IndexedDBArrayFieldParams {
    unique?: boolean;
    blank?: boolean;
    type?: any;
    default?: any;
    maxLength?: number;
    minLength?: number;
    field?: field | any;
    size?: number;
}
export interface DateTimeFieldParams {
    unique?: boolean;
    blank?: boolean;
    default?: any;
}
export interface DateFieldParams {
    unique?: boolean;
    blank?: boolean;
    default?: any;
}
export interface BooleanFieldParams {
    unique?: boolean;
    blank?: boolean;
    default?: any;
}
export interface ForeignKeyParams {
    model: any;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
    primaryKey?: boolean;
}
export interface OneToOneFieldParams {
    model: any;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
}
export interface ManyToManyFieldParams {
    model: any;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
}
export interface PossibleFieldAttributes {
    model?: any;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
    primaryKey?: boolean;
    maxLength?: number;
    minLength?: number;
    choices?: any[] | undefined;
}
