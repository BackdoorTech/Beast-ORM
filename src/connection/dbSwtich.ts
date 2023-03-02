import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { taskHolder, TaskHolderInterface } from './taskHolder.js';
import { WorkerManager, WsRegister } from './workerManager.js'

export class DBSwitch {

	static async requestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, queryId) {
		
    return new Promise(async(resolve, reject) => {

      const header: WsRegister | TaskHolderInterface = {
        params: {TableName, DatabaseName, queryId, action, arg, dbType},
        queryId: queryId,
        method: 'execute',
        callback: (message) => {
          resolve(message.value)
        }
      }

      if (typeof(Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
        WorkerManager.register(header)
      } else {
        taskHolder.register(header)
        indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg) as any
      }
    });
	}

	static async callBackRequestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, callback: Function, queryId: string) {

    const header: WsRegister | TaskHolderInterface = {
      params: {TableName, DatabaseName, queryId, action, arg, dbType},
      queryId: queryId,
      method: 'execute',
      callback: (message) => {
        callback(message.value)
      }
    }

    if (typeof(Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
      WorkerManager.register(header)
    } else {
      taskHolder.register(header)
      indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg) as any
    }
	}

}