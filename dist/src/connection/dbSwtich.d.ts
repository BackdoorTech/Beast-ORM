import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { actionParam, dbType } from './intreface.js';
export declare class DBSwitch {
    static requestHandler(TableSchema: TableSchema, DBconfig: DatabaseSchema, dbType: dbType, action: actionParam, arg: any, queryId: any): Promise<any>;
    static callBackRequestHandler(TableSchema: TableSchema, DBconfig: DatabaseSchema, dbType: dbType, action: actionParam, arg: any, queryId: any): Promise<void>;
}
