import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'
import { AutoFieldParams } from './interface.js'
export class AutoField extends field{

    unique = true
    autoIncrement = true
    primaryKey?: boolean
    type= FieldType.BIGINT

    constructor(data: AutoFieldParams) {
		super()
    Object.assign(this, data)
	}

}