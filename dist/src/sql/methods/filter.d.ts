import { ObjectConditionOperator } from '../Operators/Object-condition-operator.js';
import { argsAttributes } from '../Operators/args-attributes.js';
export declare class filter {
    private arg;
    private TableSchema;
    rows: any[];
    operator: ObjectConditionOperator;
    constructor(arg: argsAttributes, TableSchema: any);
    cursor(row: object, resolve?: any, limit?: any): Promise<void>;
    run(rows: any[]): Promise<any[]>;
}
