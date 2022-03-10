import { DatabaseSchema  } from './register-modal.interface.js';
import { DBSwitch } from '../connection/dbSwtich.js'

export class ModelManager {
    
	constructor() {}

	private obj = (config) => {
		return {
			create:(arg) => {
				return ModelManager.obj(config).create(arg)
			}
		}
	}

	static obj = (config :DatabaseSchema) => {
		return {
			create: async (arg) => {

				return await DBSwitch.requestHandler('Person', config, 'indexeddb' ,'insert' , arg)
			}
		}
	}
    
}