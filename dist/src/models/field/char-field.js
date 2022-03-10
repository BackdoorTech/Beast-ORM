import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class CharField extends field {
    constructor(data) {
        super();
        this.type = FieldType.DATE;
        Object.assign(this, data);
    }
}
