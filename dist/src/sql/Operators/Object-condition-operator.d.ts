import { TableSchema } from '../../models/register-modal.interface.js';
import { argsAttributes } from './args-attributes.js';
export declare class ObjectConditionOperator {
    private TableSchema;
    private args;
    row: any;
    constructor(TableSchema: TableSchema, args: argsAttributes);
    run(row: any): boolean | any;
    private execute;
}
