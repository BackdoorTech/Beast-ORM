import { FieldType } from '../../../BusinessLayer/fields/fields.type.js';
import { AutoFieldBL, BigIntegerFieldBL, BooleanFieldBL, CharFieldBL, DateFieldBL, DateTimeFieldBL, ForeignKeyBL, IntegerFieldBL, TextFieldBL, indexedDBArrayFieldBL, indexedDBJsonFieldBL } from '../../../BusinessLayer/validation/fields/allFields.js';
import { field } from '../../../BusinessLayer/validation/fields/allFields.type.js';
/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export class AutoField extends AutoFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'AutoField';
        this.unique = true;
        this.autoIncrement = true;
        this.blank = true;
        Object.assign(this, data);
    }
}
/**
 * Represents a BigIntegerField, a field for storing large integer values.
 */
export class BigIntegerField extends BigIntegerFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'BigIntegerField';
        this.type = FieldType.BIGINT;
        this.blank = false;
        Object.assign(this, data);
    }
}
/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export class BooleanField extends BooleanFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'BooleanField';
        this.blank = false;
        Object.assign(this, data);
    }
}
/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export class CharField extends CharFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'CharField';
        this.type = FieldType.DATE;
        this.blank = false;
        Object.assign(this, data);
    }
}
export class DateField extends DateFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'DateField';
        this.type = FieldType.DATE;
        this.blank = false;
        Object.assign(this, data);
    }
}
export class DateTimeField extends DateTimeFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'DateTimeField';
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
}
/**
 * Represents a CharField, a field for storing array.
 */
export class indexedDBArrayField extends indexedDBArrayFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'indexedDBArrayField';
        this.type = FieldType.ARRAY;
        this.blank = false;
        Object.assign(this, data);
    }
}
/**
 * Represents a CharField, a field for storing json.
 */
export class indexedDBJsonField extends indexedDBJsonFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'indexedDBJsonField';
        this.type = FieldType.JSON;
        this.blank = false;
        Object.assign(this, data);
    }
}
/**
 * Represents a CharField, a field for storing large text
 */
export class TextField extends TextFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'TextField';
        this.blank = false;
        Object.assign(this, data);
    }
}
/**
 * Represents a CharField, a field for storing integer
 */
export class IntegerField extends IntegerFieldBL {
    constructor(data) {
        super();
        this.fieldName = 'IntegerField';
        this.type = FieldType.INT;
        this.blank = false;
        Object.assign(this, data);
    }
}
export class ForeignKey extends ForeignKeyBL {
    constructor(data) {
        super();
        this.fieldName = 'ForeignKey';
        this.foreignKey = true;
        this.blank = false;
        Object.assign(this, data);
    }
}
export class OneToOneField extends field {
    constructor(data) {
        super();
        this.fieldName = 'OneToOneField';
        this.foreignKey = true;
        this.blank = false;
        Object.assign(this, data);
    }
}
export class ManyToManyField extends field {
    constructor(data) {
        super();
        this.fieldName = 'ManyToManyField';
        this.foreignKey = true;
        this.blank = false;
        Object.assign(this, data);
    }
}
