import { Methods, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { DBSwitch } from '../connection/dbSwtich.js'

export class ModelManager {
    
	constructor() {}

	static obj = (DatabaseSchema :DatabaseSchema, TableSchema: TableSchema) => {
		return {
			create: async (arg:Method[]) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'insert' , arg)
			}
		}
	}
    
}