import { Methods, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { DBSwitch } from '../connection/dbSwtich.js'

export class ModelManager {
    
	constructor() {}

	static obj = (DatabaseSchema :DatabaseSchema, TableSchema: TableSchema) => {
		return {
			create: async (arg:Method[], queryId:string) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'insert' , arg, queryId)
			},
			get: async(arg: Method[], queryId:string) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'select' , arg, queryId)
			},
			save: async(arg:Method[], queryId:string) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'update' , arg, queryId)
			},
			execute:  async(arg:Methods  | Method[], queryId:string ) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'select' , arg, queryId)
			},
			update: async (arg, queryId:string) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'update' , arg, queryId)
			},
			delete: async (arg, queryId:string) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'delete' , arg, queryId)
			},
			all: async (arg, queryId:string) => {
				return await DBSwitch.requestHandler(TableSchema, DatabaseSchema, DatabaseSchema.type ,'select' , arg, queryId)
			},
		}
	}
    
}