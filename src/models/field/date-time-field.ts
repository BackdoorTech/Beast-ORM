import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'

export class DateTimeField  extends field{
	type = FieldType.DATE
	
	constructor() {
		super()
	}
}