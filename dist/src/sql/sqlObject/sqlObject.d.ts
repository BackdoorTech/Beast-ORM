import { Method } from '../../models/model.interface.js';
import { TableSchema } from '../../models/register-modal.interface.js';
import { methodFunction } from '../methods/methods.js';
export declare class SqlObject {
    private TableSchema;
    private Methods;
    limit: number;
    rows: any[];
    firstMethod: methodFunction;
    params: any[];
    constructor(TableSchema: TableSchema, Methods: Method[]);
    runFirstMethod(row: any, resolve?: any, limit?: any): Promise<void>;
    doneRunFirstMethod(): Promise<void>;
    run(): Promise<void>;
}
