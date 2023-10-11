import { Methods, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { DBSwitch } from '../connection/dbSwtich.js'
import { ModelMigrations } from './mode-migrations.js'
import { uniqueGenerator } from '../utils.js';

export class ModelAPIRequest {
    
	constructor() {}

	static obj = (DatabaseSchema :DatabaseSchema, TableSchema?: TableSchema) => {
		return {
			create: async (args:Method[], queryId:string, callback) => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.callBackRequestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'insert' , args, callback, queryId)
			},
			get: async(arg: Method[], queryId:string) => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.requestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'select' , arg, queryId)
			},
			save: async(arg:Method[], queryId:string) => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.requestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'update' , arg, queryId)
			},
			execute:  async(arg:Methods  | Method[], queryId:string):Promise<any> => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.requestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'select' , arg, queryId)
			},
			update: async (arg, queryId:string) => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.requestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'update' , arg, queryId)
			},
			delete: async (arg, queryId:string) => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.requestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'delete' , arg, queryId)
			},
			all: async (arg, queryId:string) :Promise<any> => {
				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				return await DBSwitch.requestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'select' , arg, queryId)
			},
			migrate: async (queryId:string = uniqueGenerator()) => {
				return await DBSwitch.requestHandler(null , DatabaseSchema.databaseName, DatabaseSchema.type ,'migrate' , {DatabaseSchema, TableSchema}, queryId)
			}, trigger: async (args, Subscription: string, callback: Function) => {

				await ModelMigrations.waitMigration(DatabaseSchema.databaseName)
				DBSwitch.callBackRequestHandler(TableSchema.name, DatabaseSchema.databaseName, DatabaseSchema.type ,'trigger' , args, callback, Subscription)
			}
		}
	}
    
}