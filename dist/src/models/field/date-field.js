import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export class DateField extends field {
    constructor() {
        super();
        this.type = FieldType.DATE;
    }
}
