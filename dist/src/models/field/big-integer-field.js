import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class BigIntegerField extends field {
    constructor(data) {
        super();
        this.type = FieldType.BIGINT;
        Object.assign(this, data);
    }
}
