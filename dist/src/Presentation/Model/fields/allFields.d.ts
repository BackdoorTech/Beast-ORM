import { FieldKeys, FieldType } from '../../../BusinessLayer/fields/fields.type.js';
import { AutoFieldBL, BigIntegerFieldBL, BooleanFieldBL, CharFieldBL, DateFieldBL, DateTimeFieldBL, ForeignKeyBL, IntegerFieldBL, ManyToManyFieldBL, OneToOneFieldBL, TextFieldBL, indexedDBArrayFieldBL, indexedDBJsonFieldBL } from '../../../BusinessLayer/validation/fields/allFields.js';
import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from '../../../BusinessLayer/fields/fieldsParameters.type.js';
import { Model } from '../../Api.js';
/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export declare class AutoField extends AutoFieldBL {
    fieldName: FieldKeys;
    unique: boolean;
    autoIncrement: boolean;
    blank: boolean;
    constructor(data?: AutoFieldParams);
}
/**
 * Represents a BigIntegerField, a field for storing large integer values.
 */
export declare class BigIntegerField extends BigIntegerFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: BigIntegerFieldParams);
}
/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export declare class BooleanField extends BooleanFieldBL {
    fieldName: FieldKeys;
    blank: boolean;
    constructor(data?: BooleanFieldParams);
}
/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export declare class CharField extends CharFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: CharFieldParams);
}
export declare class DateField extends DateFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: DateFieldParams);
}
export declare class DateTimeField extends DateTimeFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    constructor(data?: DateTimeFieldParams);
}
/**
 * Represents a CharField, a field for storing array.
 */
export declare class indexedDBArrayField extends indexedDBArrayFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: IndexedDBArrayFieldParams);
}
/**
 * Represents a CharField, a field for storing json.
 */
export declare class indexedDBJsonField extends indexedDBJsonFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: IndexedDBJsonFieldParams);
}
/**
 * Represents a CharField, a field for storing large text
 */
export declare class TextField extends TextFieldBL {
    fieldName: FieldKeys;
    type: FieldType.TEXT;
    blank: boolean;
    constructor(data?: TextFieldParams);
}
/**
 * Represents a CharField, a field for storing integer
 */
export declare class IntegerField extends IntegerFieldBL {
    fieldName: FieldKeys;
    type: FieldType;
    blank: boolean;
    constructor(data?: IntegerFieldParams);
}
export declare class ForeignKey extends ForeignKeyBL {
    fieldName: FieldKeys;
    model: typeof Model<any>;
    foreignKey: boolean;
    blank: boolean;
    I: Model<any>;
    constructor(data?: ForeignKeyParams);
}
export declare class OneToOneField<T> extends OneToOneFieldBL implements OneToOneFieldParams<T> {
    fieldName: FieldKeys;
    foreignKey: boolean;
    blank: boolean;
    model: any;
    constructor(data?: OneToOneFieldParams<T>);
}
export declare class ManyToManyField extends ManyToManyFieldBL implements ManyToManyFieldParams {
    fieldName: FieldKeys;
    model: typeof Model<any>;
    I: Model<any>;
    foreignKey: boolean;
    blank: boolean;
    constructor(data?: ManyToManyFieldParams);
}
