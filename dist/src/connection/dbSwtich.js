import { indexedDB } from './indexedDb/indexedb.js';
import { IndexedDBWorkerQueue } from './worker.queue.js';
export class DBSwitch {
    static async requestHandler(TableSchema, DBconfig, dbType, action, arg, queryId) {
        if (dbType == 'indexedDB') {
            if (typeof (Worker) !== "undefined") {
                //great, your browser supports web workers
                return new Promise((resolve, reject) => {
                    IndexedDBWorkerQueue.register({
                        params: { TableSchema, DBconfig, queryId, action, arg },
                        method: 'execute',
                        func: (message) => {
                            if (message.queryId == queryId) {
                                resolve(message === null || message === void 0 ? void 0 : message.value);
                                return true;
                            }
                        },
                    });
                });
            }
            else {
                const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
                return result === null || result === void 0 ? void 0 : result.value;
            }
        }
    }
}
