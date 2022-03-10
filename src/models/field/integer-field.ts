import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'
import { IntegerFieldParams } from './interface.js'

export class IntegerField extends field {
    
	unique?: boolean
	primaryKey?: boolean
	type = FieldType.INT
	
	constructor(data?:IntegerFieldParams) {
		super()
		Object.assign(this, data);
	}
}