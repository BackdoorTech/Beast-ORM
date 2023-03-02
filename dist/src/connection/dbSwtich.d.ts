import { actionParam, dbType } from './intreface.js';
export declare class DBSwitch {
    static requestHandler(TableName: string, DatabaseName: string, dbType: dbType, action: actionParam, arg: any, queryId: any): Promise<unknown>;
    static callBackRequestHandler(TableName: string, DatabaseName: string, dbType: dbType, action: actionParam, arg: any, callback: Function, queryId: string): Promise<void>;
}
