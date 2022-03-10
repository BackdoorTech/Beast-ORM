import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'
export class DateField extends field{
	type = FieldType.DATE
	
	constructor() {
		super()
	}
}