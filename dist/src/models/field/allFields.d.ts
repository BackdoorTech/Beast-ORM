import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { AutoFieldParams, BooleanFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams } from './interface.js';
import { BigIntegerFieldParams } from './interface.js';
import { CharFieldParams } from './interface.js';
import { TextFieldParams } from './interface.js';
export declare class AutoField extends field {
    unique: boolean;
    autoIncrement: boolean;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: AutoFieldParams);
}
export declare class BigIntegerField extends field {
    unique?: boolean;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: BigIntegerFieldParams);
}
export declare class BooleanField extends field {
    constructor(data?: BooleanFieldParams);
}
export declare class CharField extends field {
    maxLength?: number | undefined;
    minLength?: number | undefined;
    choices?: any[] | undefined;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: CharFieldParams);
}
export declare class DateField extends field {
    type: FieldType;
    constructor(data?: DateFieldParams);
}
export declare class DateTimeField extends field {
    type: FieldType;
    constructor(data?: DateTimeFieldParams);
}
export declare class indexedDBArrayField extends field {
    type: FieldType;
    constructor(data?: IndexedDBArrayFieldParams);
}
export declare class indexedDBJsonField extends field {
    type: FieldType;
    constructor(data?: IndexedDBJsonFieldParams);
}
export declare class TextField extends field {
    maxLength?: number | undefined;
    minLength?: number | undefined;
    primaryKey?: boolean;
    type: FieldType.TEXT;
    constructor(data?: TextFieldParams);
}
export declare class IntegerField extends field {
    unique?: boolean;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: IntegerFieldParams);
}
export declare class ForeignKey extends field {
    model: any;
    foreignKey: boolean;
    constructor(data?: ForeignKeyParams);
}
export declare class OneToOneField extends field {
    foreignKey: boolean;
    model: any;
    constructor(data?: OneToOneFieldParams);
    contractor(contractor: any): void;
}
export declare class ManyToManyField {
    model: any;
    foreignKey: boolean;
    constructor(data?: ManyToManyFieldParams);
}
