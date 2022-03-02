import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
export declare class CharField extends field {
    maxLength: number | undefined;
    minLength: number | undefined;
    choices: any[] | undefined;
    type: FieldType.CHAR;
    constructor(data?: {
        maxLength?: number;
        minLength?: number;
    });
}
