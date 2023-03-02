import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { taskHolder } from './taskHolder.js';
import { WorkerManager } from './workerManager.js'

export class DBSwitch {

	static async requestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, queryId) {
		
			//great, your browser supports web workers
			return new Promise(async(resolve, reject) => {

				if (typeof(Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
					const request = WorkerManager.register({
						params: {TableName, DatabaseName, queryId, action, arg, dbType},
						queryId: queryId,
						method: 'execute',
						callback: (message) => {
							resolve(message.value)
						}
					})

					if(request == false) {
						
						const callback = (data) => {
							resolve(data.value)
						}
						const result = await indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg) as any
						resolve(result?.value)
					}

				} else {

					const callback = (data) => {
						resolve(data.value)
					}
		
					const result = await indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg) as any
					resolve(result?.value)
				}
			});
	}

	static async callBackRequestHandler(TableName: string, DatabaseName: string, dbType : dbType, action: actionParam, arg: any, callback: Function, queryId: string) {
		if (typeof(Worker) !== "undefined" && WorkerManager.webWorkerModuleSupport) {
			//great, your browser supports web workers
			const request = WorkerManager.register({
				params: {TableName, DatabaseName, queryId, action, arg, dbType},
				queryId: queryId,
				method: 'execute',
				callback: (message) => {
					callback(message.value)
				}
			})

			if(request == false) {
				const callback = (data) => {
					taskHolder.onmessage(data)
				}
				indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg) as any
			}

		} else {
			const callback = (data) => {
				taskHolder.onmessage(data)
			}

			indexedDB.requestHandler(TableName, DatabaseName, queryId, callback)[action](arg) as any
		}
	}

}