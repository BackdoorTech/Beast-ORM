import { ITableSchema } from '../../../BusinessLayer/_interface/interface.type.js';
import { argsAttributes } from './args-attributes.js';
export declare class ObjectConditionOperator {
    private TableSchema;
    private args;
    row: any;
    constructor(TableSchema: ITableSchema, args: argsAttributes);
    run(row: any): boolean | any;
    private execute;
}
