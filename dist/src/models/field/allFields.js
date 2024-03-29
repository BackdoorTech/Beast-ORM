import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class AutoField extends field {
    constructor(data) {
        super();
        this.fieldName = 'AutoField';
        this.unique = true;
        this.autoIncrement = true;
        this.type = FieldType.BIGINT;
        this.blank = true;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'bigint' || typeof value == 'number')) {
            return false;
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return false;
        }
        return false;
    }
}
export class BigIntegerField extends field {
    constructor(data) {
        super();
        this.fieldName = 'BigIntegerField';
        this.type = FieldType.BIGINT;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'bigint' || typeof value == 'number')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
            else if (!(value === null || value === undefined)) {
                return false;
            }
        }
        else if (!this.rules(this, value)) {
            return false;
        }
        return true;
    }
}
export class BooleanField extends field {
    constructor(data) {
        super();
        this.fieldName = 'BooleanField';
        Object.assign(this, data);
    }
    valid(value) {
        if (typeof value != 'boolean') {
            return false;
        }
        return true;
    }
}
export class CharField extends field {
    constructor(data) {
        super();
        this.fieldName = 'CharField';
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
            else if (!(value === null || value === undefined)) {
                return false;
            }
        }
        else if (!this.rules(this, value)) {
            return false;
        }
        return true;
    }
}
export class DateField extends field {
    constructor(data) {
        super();
        this.fieldName = 'DateField';
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return true;
        }
        return false;
    }
}
export class DateTimeField extends field {
    constructor(data) {
        super();
        this.fieldName = 'DateTimeField';
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return false;
        }
        return true;
    }
}
export class indexedDBArrayField extends field {
    constructor(data) {
        super();
        this.fieldName = 'indexedDBArrayField';
        this.type = FieldType.ARRAY;
        Object.assign(this, data);
    }
    get field() {
        return this._field;
    }
    set field(value) {
        this._field = value;
    }
    valid(value) {
        if (!(Array.isArray(value))) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        else if (this.isNull(value) == true) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        else if (this.size) {
            if (value.length != this.size) {
                return false;
            }
        }
        if (this.field) {
            for (const e of value) {
                if (!this.field.valid(e)) {
                    return false;
                }
            }
        }
        return true;
    }
}
export class indexedDBJsonField extends field {
    constructor(data) {
        super();
        this.fieldName = 'indexedDBJsonField';
        this.type = FieldType.JSON;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'object' && Array.isArray(value) == false)) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        else if (this.isNull(value) == true) {
        }
        return true;
    }
}
export class TextField extends field {
    constructor(data) {
        super();
        this.fieldName = 'TextField';
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
            else if (!(value === null || value === undefined)) {
                return false;
            }
        }
        else if (!this.rules(this, value)) {
            return false;
        }
        return true;
    }
}
export class IntegerField extends field {
    constructor(data) {
        super();
        this.fieldName = 'IntegerField';
        this.type = FieldType.INT;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'number')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
            else if (!(value === null || value === undefined)) {
                return false;
            }
        }
        else if (!this.rules(this, value)) {
            return false;
        }
        return true;
    }
}
export class ForeignKey extends field {
    constructor(data) {
        super();
        this.fieldName = 'ForeignKey';
        this.foreignKey = true;
        Object.assign(this, data);
    }
    valid(value) {
        return !this.isNull(value);
    }
}
export class OneToOneField extends field {
    constructor(data) {
        super();
        this.fieldName = 'ManyToManyField';
        this.foreignKey = true;
        Object.assign(this, data);
    }
    contractor(contractor) {
        throw new Error('Method not implemented.');
    }
    valid(value) {
        return !this.isNull(value);
    }
}
export class ManyToManyField extends field {
    constructor(data) {
        super();
        this.fieldName = 'ManyToManyField';
        this.foreignKey = true;
        Object.assign(this, data);
    }
    valid(value) {
        return !this.isNull(value);
    }
}
