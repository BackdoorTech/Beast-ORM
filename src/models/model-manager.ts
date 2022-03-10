import { Methods, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { DBSwitch } from '../connection/dbSwtich.js'

export class ModelManager {
    
	constructor() {}

	static obj = (DatabaseSchema :DatabaseSchema, TableSchema: TableSchema) => {
		return {
			create: async (arg:Method[]) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'insert' , arg)
			},
			get: async(arg: Method[]) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'select' , arg)
			},
			save: async(arg:Method[]) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'update' , arg)
			},
			execute:  async(arg:Methods  | Method[] ) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'select' , arg)
			},
			update: async (arg) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'update' , arg)
			},
			delete: async (arg) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'delete' , arg)
			},
			all: async (arg) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'select' , arg)
			},
		}
	}
    
}