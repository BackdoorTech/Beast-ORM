import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class AutoField extends field {
    constructor(data) {
        super();
        this.unique = true;
        this.autoIncrement = true;
        this.type = FieldType.BIGINT;
        Object.assign(this, data);
    }
}
export class BigIntegerField extends field {
    constructor(data) {
        super();
        this.type = FieldType.BIGINT;
        Object.assign(this, data);
    }
}
export class BooleanField extends field {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
}
export class CharField extends field {
    constructor(data) {
        super();
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
}
export class DateField extends field {
    constructor(data) {
        super();
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
}
export class DateTimeField extends field {
    constructor(data) {
        super();
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
}
export class indexedDBArrayField extends field {
    constructor(data) {
        super();
        this.type = FieldType.ARRAY;
        Object.assign(this, data);
    }
}
export class indexedDBJsonField extends field {
    constructor(data) {
        super();
        this.type = FieldType.JSON;
        Object.assign(this, data);
    }
}
export class TextField extends field {
    constructor(data) {
        super();
        Object.assign(this, data);
    }
}
export class IntegerField extends field {
    constructor(data) {
        super();
        this.type = FieldType.INT;
        Object.assign(this, data);
    }
}
export class ForeignKey extends field {
    constructor(data) {
        super();
        this.foreignKey = true;
        Object.assign(this, data);
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
}
export class ManyToManyField {
    constructor(data) {
        this.foreignKey = true;
    }
}
