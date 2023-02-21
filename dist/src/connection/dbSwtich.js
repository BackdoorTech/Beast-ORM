import { indexedDB } from './indexedDb/indexedb.js';
import { IndexedDBWorkerQueue } from './worker.queue.js';
export class DBSwitch {
    static async requestHandler(TableSchema, DBconfig, dbType, action, arg, queryId) {
        if (typeof (Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
            //great, your browser supports web workers
            return new Promise(async (resolve, reject) => {
                const request = IndexedDBWorkerQueue.register({
                    params: { TableSchema, DBconfig, queryId, action, arg, dbType },
                    queryId: queryId,
                    method: 'execute',
                    func: (message) => {
                        resolve(message === null || message === void 0 ? void 0 : message.value);
                    },
                });
                if (request == false) {
                    const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
                    resolve(result === null || result === void 0 ? void 0 : result.value);
                }
            });
        }
        else {
            const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
            return result === null || result === void 0 ? void 0 : result.value;
        }
    }
    static async callBackRequestHandler(TableSchema, DBconfig, dbType, action, arg, queryId) {
        if (typeof (Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
            //great, your browser supports web workers
            const request = IndexedDBWorkerQueue.register({
                params: { TableSchema, DBconfig, queryId, action, arg, dbType },
                queryId: queryId,
                method: 'execute',
                func: (message) => {
                    arg.callback(message === null || message === void 0 ? void 0 : message.value);
                },
            });
            if (request == false) {
                const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
                arg.callback(result === null || result === void 0 ? void 0 : result.value);
            }
        }
        else {
            const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
            arg.callback(result === null || result === void 0 ? void 0 : result.value);
        }
    }
}
