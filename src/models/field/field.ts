import { FieldKeys } from "./fields.interface"

export class field{
    
	fieldName: FieldKeys
	primaryKey?
	maxLength?:number | undefined
	minLength?:number | undefined
	choices?: any[] | undefined
	type: number
	blank?: boolean
	default?: any
	unique?: boolean
	foreignKey?: boolean
	model?: field

	get field() {
		return true
	}

	isNull(value) {

		if(value == undefined) {
			return true
		} else if(value == null) {
			return true
		} else if(value == '' && !Array.isArray(value)) {
			return true
		}

		return false
	}


	rules(field: field, value) {

		if(field?.maxLength) {
			if(value.toString().length > field.maxLength) {
				return false
			}
			
		}
		if(field?.minLength) {
			if(value.toString().length < field.minLength) {
				return false
			}
			
		}

		if(field?.foreignKey) {
			
		}

		return true
	}
}