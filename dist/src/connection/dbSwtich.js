import { indexedDB } from './indexedDb/indexedb.js';
import { taskHolder } from './taskHolder.js';
import { WorkerManager } from './workerManager.js';
export class DBSwitch {
    static async requestHandler(TableName, DatabaseName, dbType, action, arg, queryId) {
        //great, your browser supports web workers
        return new Promise(async (resolve, reject) => {
            if (typeof (Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
                const request = WorkerManager.register({
                    params: { TableName, DatabaseName, queryId, action, arg, dbType },
                    queryId: queryId,
                    method: 'execute',
                    callback: (message) => {
                        resolve(message.value);
                    }
                });
                if (request == false) {
                    const callback = (data) => {
                        resolve(data.value);
                    };
                    const result = await indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg);
                    resolve(result === null || result === void 0 ? void 0 : result.value);
                }
            }
            else {
                const callback = (data) => {
                    resolve(data.value);
                };
                const result = await indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg);
                resolve(result === null || result === void 0 ? void 0 : result.value);
            }
        });
    }
    static async callBackRequestHandler(TableName, DatabaseName, dbType, action, arg, callback, queryId) {
        if (typeof (Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
            //great, your browser supports web workers
            const request = WorkerManager.register({
                params: { TableName, DatabaseName, queryId, action, arg, dbType },
                queryId: queryId,
                method: 'execute',
                callback: (message) => {
                    callback(message.value);
                }
            });
            if (request == false) {
                const callback = (data) => {
                    taskHolder.onmessage(data);
                };
                indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg);
            }
        }
        else {
            const callback = (data) => {
                taskHolder.onmessage(data);
            };
            indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg);
        }
    }
}
