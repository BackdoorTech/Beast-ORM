import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { IndexedDBWorkerQueue } from './worker.queue.js'

export class DBSwitch {

	static async requestHandler(TableSchema: TableSchema, DBconfig:DatabaseSchema, dbType : dbType, action: actionParam, arg: any, queryId) {
		if (typeof(Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
			//great, your browser supports web workers
			return new Promise(async(resolve, reject) => {

	
				const request = IndexedDBWorkerQueue.register({
					params: {TableSchema, DBconfig, queryId, action, arg, dbType},
					queryId: queryId,
					method: 'execute',
					func:(message) => {
						resolve(message?.value)
					},
				})

				if(request == false) {
					const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg) as any
					resolve(result?.value) 
				}
			});

		} else {
			const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg) as any
			return result?.value
		}
	}

}