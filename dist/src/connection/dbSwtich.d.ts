import { DatabaseSchema } from '../models/register-modal.interface.js';
export declare class DBSwitch {
    static requestHandler(tableName: string, DBconfig: DatabaseSchema, dbType: "indexeddb", action: 'insert' | 'update' | 'delete', arg: any): Promise<any>;
}
