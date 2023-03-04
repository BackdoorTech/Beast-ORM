import { Model } from './models/model.js'
import { LocalStorage } from './models/model.js'
import * as Fields from './models/field/fields.js'
import { ModelReader } from './models/model.reader.js'
import { registerModel, migrate } from './models/register-model.js'


export const models = {
	Model,
	LocalStorage,
	read: ModelReader.read,
	migrate: migrate,
	register: registerModel.register,
	...Fields,
	Value(arg) {
		if(arg == 'null') {
			return {}
		}
	},
}