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
