import { indexedDB } from './indexedDb/indexedb.js';
import { IndexedDBWorkerQueue } from './worker.queue.js';
export class DBSwitch {
    static async requestHandler(TableName, DatabaseName, dbType, action, arg, queryId) {
        if (typeof (Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
            //great, your browser supports web workers
            return new Promise(async (resolve, reject) => {
                const request = IndexedDBWorkerQueue.register({
                    params: { TableName, DatabaseName, queryId, action, arg, dbType },
                    queryId: queryId,
                    method: 'execute',
                    callback: (message) => {
                        resolve(message.value);
                    }
                });
                if (request == false) {
                    console.log(JSON.stringify({ TableName, DatabaseName, queryId, action, arg, dbType }));
                    const result = await indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg);
                    resolve(result === null || result === void 0 ? void 0 : result.value);
                }
            });
        }
        else {
            throw ({ TableName, DatabaseName, queryId, action, arg, dbType });
        }
    }
    static async callBackRequestHandler(TableName, DatabaseName, dbType, action, arg, callback, queryId) {
        if (typeof (Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
            //great, your browser supports web workers
            const request = IndexedDBWorkerQueue.register({
                params: { TableName, DatabaseName, queryId, action, arg, dbType },
                queryId: queryId,
                method: 'execute',
                callback: (message) => {
                    callback(message.value);
                }
            });
            if (request == false) {
                throw ({ TableName, DatabaseName, queryId, action, arg, dbType });
            }
        }
        else {
            throw ({ TableName, DatabaseName, queryId, action, arg, dbType });
        }
    }
}
