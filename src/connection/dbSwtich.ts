import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { IndexedDBWorkerQueue } from './worker.queue.js'

export class DBSwitch {

	static async requestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, queryId) {
		if (typeof(Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
			//great, your browser supports web workers
			return new Promise(async(resolve, reject) => {

	
				const request = IndexedDBWorkerQueue.register({
					params: {TableName, DatabaseName, queryId, action, arg, dbType},
					queryId: queryId,
					method: 'execute',
					callback: (message) => {
						resolve(message.value)
					}
				})

				if(request == false) {
					console.log(JSON.stringify({TableName, DatabaseName, queryId, action, arg, dbType}))
					
					const result = await indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg) as any
					resolve(result?.value) 
				}
			});

		} else {
			throw({TableName, DatabaseName, queryId, action, arg, dbType})
		}
	}

	static async callBackRequestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, callback: Function, queryId: string) {
		if (typeof(Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
			//great, your browser supports web workers
			const request = IndexedDBWorkerQueue.register({
				params: {TableName, DatabaseName, queryId, action, arg, dbType},
				queryId: queryId,
				method: 'execute',
				callback: (message) => {
					callback(message.value)
				}
			})

			if(request == false) {
				throw({TableName, DatabaseName, queryId, action, arg, dbType})
			}

		} else {
			throw({TableName, DatabaseName, queryId, action, arg, dbType})
		}
	}

}