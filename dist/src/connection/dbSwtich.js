import { indexedDB } from './indexedDb/indexedb.js';
export class DBSwitch {
    static async requestHandler(TableSchema, DBconfig, dbType, action, arg) {
        if (dbType == 'indexedDB') {
            return await indexedDB.requestHandler(TableSchema, DBconfig)[action](arg);
        }
    }
}
