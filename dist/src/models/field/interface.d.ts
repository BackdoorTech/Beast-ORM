export interface CharFieldParams {
    maxLength?: number;
    minLength?: number;
    primaryKey?: boolean;
    choices?: any[] | undefined;
    unique?: boolean;
    blank?: boolean;
}
export interface TextFieldParams {
    maxLength?: number;
    minLength?: number;
    primaryKey?: boolean;
    unique?: boolean;
}
export interface IntegerFieldParams {
    primaryKey?: boolean;
    unique?: boolean;
}
export interface BigIntegerFieldParams {
    primaryKey?: boolean;
    unique?: boolean;
}
export interface AutoFieldParams {
    primaryKey?: boolean;
}
export interface IndexedDBJsonFieldParams {
    unique?: boolean;
    blank?: boolean;
}
export interface IndexedDBArrayFieldParams {
    unique?: boolean;
    blank?: boolean;
    type?: any;
}
export interface DateTimeFieldParams {
    unique?: boolean;
    blank?: boolean;
}
export interface DateFieldParams {
    unique?: boolean;
    blank?: boolean;
}
export interface BooleanFieldParams {
    unique?: boolean;
    blank?: boolean;
}
