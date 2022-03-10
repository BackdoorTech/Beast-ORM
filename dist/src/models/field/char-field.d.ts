import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { CharFieldParams } from './interface.js';
export declare class CharField extends field {
    maxLength?: number | undefined;
    minLength?: number | undefined;
    choices?: any[] | undefined;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data?: CharFieldParams);
}
