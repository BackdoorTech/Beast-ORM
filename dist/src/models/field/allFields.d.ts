import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { FieldKeys } from './fields.interface.js';
import { AutoFieldParams, BooleanFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams } from './interface.js';
import { BigIntegerFieldParams } from './interface.js';
import { CharFieldParams } from './interface.js';
import { TextFieldParams } from './interface.js';
export declare class AutoField extends field {
    fieldName: FieldKeys;
    unique: boolean;
    autoIncrement: boolean;
    primaryKey?: boolean;
    type: FieldType;
    blank: boolean;
    default?: any;
    constructor(data?: AutoFieldParams);
    valid(value: any): boolean;
}
export declare class BigIntegerField extends field {
    fieldName: FieldKeys;
    unique?: boolean;
    primaryKey?: boolean;
    blank?: boolean;
    default?: any;
    type: FieldType;
    constructor(data?: BigIntegerFieldParams);
    valid(value: any): boolean;
}
export declare class BooleanField extends field {
    fieldName: FieldKeys;
    unique?: boolean;
    blank?: boolean;
    default?: any;
    constructor(data?: BooleanFieldParams);
    valid(value: any): boolean;
}
export declare class CharField extends field {
    fieldName: FieldKeys;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    choices?: any[] | undefined;
    primaryKey?: boolean;
    blank?: boolean;
    default?: any;
    unique?: boolean;
    type: FieldType;
    constructor(data?: CharFieldParams);
    valid(value: any): boolean;
}
export declare class DateField extends field {
    fieldName: FieldKeys;
    type: FieldType;
    blank?: boolean;
    default?: any;
    constructor(data?: DateFieldParams);
    valid(value: any): boolean;
}
export declare class DateTimeField extends field {
    fieldName: FieldKeys;
    type: FieldType;
    blank?: boolean;
    default?: any;
    constructor(data?: DateTimeFieldParams);
    valid(value: any): boolean;
}
export declare class indexedDBArrayField extends field {
    fieldName: FieldKeys;
    type: FieldType;
    blank?: boolean;
    default?: any;
    maxLength?: number;
    minLength?: number;
    size?: number;
    private _field?;
    get field(): any;
    set field(value: any);
    constructor(data?: IndexedDBArrayFieldParams);
    valid(value: any): boolean;
}
export declare class indexedDBJsonField extends field {
    fieldName: FieldKeys;
    type: FieldType;
    blank?: boolean;
    default?: any;
    null?: boolean;
    constructor(data?: IndexedDBJsonFieldParams);
    valid(value: any): boolean;
}
export declare class TextField extends field {
    fieldName: FieldKeys;
    maxLength?: number | undefined;
    minLength?: number | undefined;
    primaryKey?: boolean;
    blank?: boolean;
    default?: any;
    type: FieldType.TEXT;
    constructor(data?: TextFieldParams);
    valid(value: any): boolean;
}
export declare class IntegerField extends field {
    fieldName: FieldKeys;
    unique?: boolean;
    primaryKey?: boolean;
    type: FieldType;
    blank?: boolean;
    default?: any;
    constructor(data?: IntegerFieldParams);
    valid(value: any): boolean;
}
export declare class ForeignKey extends field {
    fieldName: FieldKeys;
    model: any;
    foreignKey: boolean;
    blank?: boolean;
    default?: any;
    constructor(data?: ForeignKeyParams);
    valid(value: any): boolean;
}
export declare class OneToOneField extends field {
    fieldName: FieldKeys;
    foreignKey: boolean;
    model: any;
    blank?: boolean;
    default?: any;
    onDelete?: any;
    constructor(data?: OneToOneFieldParams);
    contractor(contractor: any): void;
    valid(value: any): boolean;
}
export declare class ManyToManyField extends field {
    fieldName: FieldKeys;
    model: any;
    foreignKey: boolean;
    blank?: boolean;
    default?: any;
    onDelete?: any;
    unique?: boolean;
    constructor(data?: ManyToManyFieldParams);
    valid(value: any): boolean;
}
