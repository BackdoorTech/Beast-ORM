import { indexedDB } from './indexedDb/indexedb.js';
import { taskHolder } from './taskHolder.js';
import { WorkerManager } from './workerManager.js';
export class DBSwitch {
    static header({ TableName, DatabaseName, queryId, action, arg, dbType, callback }) {
        return {
            params: { TableName, DatabaseName, queryId, action, arg, dbType },
            queryId: queryId,
            method: 'execute',
            callback: (message) => {
                callback(message.value);
            }
        };
    }
    static async requestHandler(TableName, DatabaseName, dbType, action, arg, queryId) {
        return new Promise(async (resolve, reject) => {
            const header = this.header({ TableName, DatabaseName, queryId, action, arg, dbType, callback: resolve });
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
        const header = this.header({ TableName, DatabaseName, queryId, action, arg, dbType, callback });
        if (typeof (Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
            WorkerManager.register(header);
        }
        else {
            taskHolder.register(header);
            indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg);
        }
    }
}
