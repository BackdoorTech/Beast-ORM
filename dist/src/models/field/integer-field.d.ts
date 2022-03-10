import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { IntegerFieldParams } from './interface.js';
export declare class IntegerField extends field {
    unique?: boolean;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: IntegerFieldParams);
}
