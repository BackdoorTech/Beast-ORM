import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { taskHolder, TaskHolderInterface } from './taskHolder.js';
import { WorkerManager, WsRegister } from './workerManager.js'

export class DBSwitch {

  private static header ({TableName, DatabaseName, queryId, action, arg, dbType, callback}) : WsRegister | TaskHolderInterface {
    return {
      params: {TableName, DatabaseName, queryId, action, arg, dbType},
      queryId: queryId,
      method: 'execute',
      callback: (message) => {
        callback(message.value)
      }
    }
  }

	static async requestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, queryId) {
		
    return new Promise(async(resolve, reject) => {

      const header = this.header({TableName, DatabaseName, queryId, action, arg, dbType, callback: (data) => {
        resolve(data)
        taskHolder.finish(queryId)
      }})

      if (typeof(Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
        WorkerManager.register(header)
      } else {
        taskHolder.register(header)
        indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg) as any
      }
    });
	}

	static async callBackRequestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, callback: Function, queryId: string) {

    const header = this.header({TableName, DatabaseName, queryId, action, arg, dbType, callback})

    if (typeof(Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
      WorkerManager.register(header)
    } else {
      taskHolder.register(header)
      indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg) as any
    }
	}

}