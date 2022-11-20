import { Model } from './models/model.js'
import * as Fields from './models/field/fields.js'
import { ModelReader } from './models/model.reader.js'
import { registerModel } from './models/register-model.js'


export const models = {
	Model,
	read: ModelReader.read,
	register: registerModel.register,
	migrate: registerModel.register,
	...Fields,
	Value(arg) {
		if(arg == 'null') {
			return {}
		}
	},
}