import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'
import { BigIntegerFieldParams } from './interface.js'
export class BigIntegerField extends field{

		unique?: boolean
	primaryKey?: boolean

	type = FieldType.BIGINT
	
	constructor(data?:BigIntegerFieldParams) {
		super()
		Object.assign(this, data);
	}
}