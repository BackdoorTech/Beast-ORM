import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class IntegerField extends field {
    constructor(data) {
        super();
        this.type = FieldType.INT;
        Object.assign(this, data);
    }
}
