import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';
import { IndexedDBWorkerQueue } from './worker.queue.js'

export class DBSwitch {

	static async requestHandler(TableSchema: TableSchema, DBconfig:DatabaseSchema, dbType : dbType, action: actionParam, arg: any, queryId) {
		if(dbType == 'indexedDB') {

			const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg) as any
			return result?.value

		}
	}

}