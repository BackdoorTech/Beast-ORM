import { TableSchema, FieldSchema } from '../../models/register-modal.interface.js';
import { AttributesMap } from '../../models/field/fields.interface.js';
import { argsAttributes } from './args-attributes.js';
export declare class ObjectConditionOperator {
    private TableSchema;
    private args;
    schemeFields: AttributesMap<string, FieldSchema>;
    row: any;
    constructor(TableSchema: TableSchema, args: argsAttributes);
    run(row: any): Promise<boolean | any>;
    private execute;
}
