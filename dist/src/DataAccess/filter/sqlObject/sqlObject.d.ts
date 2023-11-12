import { ITableSchema } from '../../../BusinessLayer/_interface/interface.js';
import { methodFunction } from '../methods/methods.js';
import { argsAttributes } from '../Operators/args-attributes.js';
import { QueryReaderSelect } from "../../QueryReader/queryReader.js";
export declare class SqlObject {
    private TableSchema;
    limit: number;
    rows: any[];
    firstMethod: methodFunction;
    params: any[];
    argsAttributes: argsAttributes;
    QueryReaderSelect: QueryReaderSelect;
    constructor(TableSchema: ITableSchema, QueryReaderSelect: QueryReaderSelect);
    run(rows: any[]): Promise<any[]>;
}
