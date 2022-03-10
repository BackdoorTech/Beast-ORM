import { FieldType } from '../../sql/query/interface.js';
import { field } from './field.js';
import { AutoFieldParams } from './interface.js';
export declare class AutoField extends field {
    unique: boolean;
    autoIncrement: boolean;
    primaryKey?: boolean;
    type: FieldType;
    constructor(data: AutoFieldParams);
}
