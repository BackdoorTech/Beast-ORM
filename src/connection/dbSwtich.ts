import { DatabaseSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'


export class DBSwitch {

	static async requestHandler(tableName: string, DBconfig:DatabaseSchema, dbType : "indexeddb", action: 'insert' | 'update' | 'delete', arg: any) {
		if(dbType == 'indexeddb') {
			return await indexedDB.requestHandler(tableName, DBconfig)[action](arg)
		}
	}

}