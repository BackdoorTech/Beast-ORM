import { indexedDB } from './indexedDb/indexedb.js';
export class DBSwitch {
    static async requestHandler(TableSchema, DBconfig, dbType, action, arg, queryId) {
        if (dbType == 'indexedDB') {
            const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
            return result === null || result === void 0 ? void 0 : result.value;
        }
    }
}
