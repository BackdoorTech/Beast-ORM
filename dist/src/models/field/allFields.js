import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class AutoField extends field {
    constructor(data) {
        super();
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
        this.type = FieldType.BIGINT;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'bigint' || typeof value == 'number')) {
            return false;
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return false;
        }
        return true;
    }
}
export class BooleanField extends field {
    constructor(data) {
        super();
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
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            return false;
        }
        return true;
    }
}
export class DateField extends field {
    constructor(data) {
        super();
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            return false;
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
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            return false;
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
        this.type = FieldType.ARRAY;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(Array.isArray(value))) {
            return false;
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return false;
        }
        return true;
    }
}
export class indexedDBJsonField extends field {
    constructor(data) {
        super();
        this.type = FieldType.JSON;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'object' && Array.isArray(value) == false)) {
            return false;
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return false;
        }
        return true;
    }
}
export class TextField extends field {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'string')) {
            return false;
        }
        else if (!((this === null || this === void 0 ? void 0 : this.blank) == undefined && this.isNull(value) == false)) {
            return false;
        }
        return true;
    }
}
export class IntegerField extends field {
    constructor(data) {
        super();
        this.type = FieldType.INT;
        Object.assign(this, data);
    }
    valid(value) {
        if (!(typeof value == 'number')) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        else if (this.isNull(value)) {
            if ((this === null || this === void 0 ? void 0 : this.blank) != true) {
                return false;
            }
        }
        return true;
    }
}
export class ForeignKey extends field {
    constructor(data) {
        super();
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
        this.foreignKey = true;
        Object.assign(this, data);
    }
    valid(value) {
        return !this.isNull(value);
    }
}
