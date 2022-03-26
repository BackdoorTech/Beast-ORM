export class field{
    
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
		return value == undefined || null || ''
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