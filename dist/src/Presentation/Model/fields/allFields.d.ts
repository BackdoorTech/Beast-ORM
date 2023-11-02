import { FieldKeys, TextFieldParams, BigIntegerFieldParams, CharFieldParams, AutoFieldParams, BooleanFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, FieldType, field } from './allFields.type.js';
/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export declare class AutoField extends field implements AutoFieldParams {
    fieldName: FieldKeys;
    unique: boolean;
    autoIncrement: boolean;
    blank: boolean;
    constructor(data?: AutoFieldParams);
}
/**
 * Represents a BigIntegerField, a field for storing large integer values.
 */
export declare class BigIntegerField extends field implements AutoFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: BigIntegerFieldParams);
}
/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export declare class BooleanField extends field implements BooleanFieldParams {
    fieldName: FieldKeys;
    blank: boolean;
    constructor(data?: BooleanFieldParams);
}
/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export declare class CharField extends field implements CharFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: CharFieldParams);
}
export declare class DateField extends field implements DateFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: DateFieldParams);
}
export declare class DateTimeField extends field implements DateTimeFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    constructor(data?: DateTimeFieldParams);
}
/**
 * Represents a CharField, a field for storing array.
 */
export declare class indexedDBArrayField extends field implements IndexedDBArrayFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    private _field?;
    get field(): any;
    set field(value: any);
    constructor(data?: IndexedDBArrayFieldParams);
}
/**
 * Represents a CharField, a field for storing json.
 */
export declare class indexedDBJsonField extends field implements IndexedDBJsonFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: IndexedDBJsonFieldParams);
}
/**
 * Represents a CharField, a field for storing large text
 */
export declare class TextField extends field implements TextFieldParams {
    fieldName: FieldKeys;
    type: FieldType.TEXT;
    blank: boolean;
    constructor(data?: TextFieldParams);
}
/**
 * Represents a CharField, a field for storing integer
 */
export declare class IntegerField extends field implements IntegerFieldParams {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: IntegerFieldParams);
}
export declare class ForeignKey extends field implements ForeignKeyParams {
    fieldName: FieldKeys;
    model: any;
    foreignKey: boolean;
    blank: boolean;
    constructor(data?: ForeignKeyParams);
}
export declare class OneToOneField extends field implements OneToOneFieldParams {
    fieldName: FieldKeys;
    foreignKey: boolean;
    blank: boolean;
    model: any;
    constructor(data?: OneToOneFieldParams);
}
export declare class ManyToManyField extends field implements ManyToManyFieldParams {
    fieldName: FieldKeys;
    model: any;
    foreignKey: boolean;
    blank: boolean;
    constructor(data?: ManyToManyFieldParams);
}
