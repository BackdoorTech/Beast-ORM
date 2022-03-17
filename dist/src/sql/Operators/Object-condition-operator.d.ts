import { TableSchema } from '../../models/register-modal.interface.js';
export declare class ObjectConditionOperator {
    private row;
    private TableSchema;
    constructor(row: any, TableSchema: TableSchema);
    run(args: any): Promise<boolean | any>;
    private execute;
}
