import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { BigIntegerFieldParams } from './interface.js';
export declare class BigIntegerField extends field {
    unique?: boolean;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: BigIntegerFieldParams);
}
