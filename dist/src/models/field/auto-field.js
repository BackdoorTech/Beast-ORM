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
