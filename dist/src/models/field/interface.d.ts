import { field } from './field.js';
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
