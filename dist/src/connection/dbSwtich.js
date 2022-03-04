import { indexedDB } from './indexedDb/indexedb.js';
export class DBSwitch {
    static async requestHandler(tableName, DBconfig, dbType, action, arg) {
        if (dbType == 'indexeddb') {
            return await indexedDB.requestHandler(tableName, DBconfig)[action](arg);
        }
    }
}
