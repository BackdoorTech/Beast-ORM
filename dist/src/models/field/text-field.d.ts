import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { TextFieldParams } from './interface.js';
export declare class TextField extends field {
    maxLength?: number | undefined;
    minLength?: number | undefined;
    primaryKey?: boolean;
    type: FieldType.TEXT;
    constructor(data?: TextFieldParams);
}
