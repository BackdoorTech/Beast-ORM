import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { IndexedDBWorkerQueue } from './worker.queue.js'

export class DBSwitch {

	static async requestHandler(TableSchema: TableSchema, DBconfig:DatabaseSchema, dbType : dbType, action: actionParam, arg: any, queryId) {
		if(dbType == 'indexedDB') {

			if (typeof(Worker) !== "undefined" && IndexedDBWorkerQueue.webWorkerModuleSupport) {
				//great, your browser supports web workers
				return new Promise((resolve, reject) => {
					IndexedDBWorkerQueue.register({
						params: {TableSchema, DBconfig, queryId, action, arg, dbType},
						method: 'execute',
						func:(message) => {
							if(message.queryId == queryId) {
								resolve(message?.value)
								return true
							}
						},
					})
				});

			} else {
				const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg) as any
				return result?.value
			}

		}
	}

}