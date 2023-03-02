import { indexedDB } from './indexedDb/indexedb.js';
import { taskHolder } from './taskHolder.js';
import { WorkerManager } from './workerManager.js';
export class DBSwitch {
    static async requestHandler(TableName, DatabaseName, dbType, action, arg, queryId) {
        return new Promise(async (resolve, reject) => {
            const header = {
                params: { TableName, DatabaseName, queryId, action, arg, dbType },
                queryId: queryId,
                method: 'execute',
                callback: (message) => {
                    resolve(message.value);
                }
            };
            if (typeof (Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
                WorkerManager.register(header);
            }
            else {
                taskHolder.register(header);
                indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg);
            }
        });
    }
    static async callBackRequestHandler(TableName, DatabaseName, dbType, action, arg, callback, queryId) {
        const header = {
            params: { TableName, DatabaseName, queryId, action, arg, dbType },
            queryId: queryId,
            method: 'execute',
            callback: (message) => {
                callback(message.value);
            }
        };
        if (typeof (Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
            WorkerManager.register(header);
        }
        else {
            taskHolder.register(header);
            indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg);
        }
    }
}
