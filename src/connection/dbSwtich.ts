import { DatabaseSchema, TableSchema } from '../models/register-modal.interface.js';
import { indexedDB } from './indexedDb/indexedb.js'
import { actionParam, dbType } from './intreface.js';

export class DBSwitch {

	static async requestHandler(TableSchema: TableSchema, DBconfig:DatabaseSchema, dbType : dbType, action: actionParam, arg: any) {
		if(dbType == 'indexedDB') {
			return await indexedDB.requestHandler(TableSchema, DBconfig)[action](arg)
		}
	}

}