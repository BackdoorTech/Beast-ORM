import { TableSchema, FieldSchema } from '../../models/register-modal.interface.js';
import { AttributesMap } from '../../models/field/fields.interface.js';
export declare class ObjectConditionOperator {
    private row;
    private TableSchema;
    schemeFields: AttributesMap<string, FieldSchema>;
    constructor(row: any, TableSchema: TableSchema);
    run(args: any): Promise<boolean | any>;
    private execute;
}
