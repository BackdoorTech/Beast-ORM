
import { TableSchema } from '../../models/register-modal.interface.js';

export class gt {
	static validate(field, arg, fieldValue, row):boolean {
		return fieldValue > arg
	}
}

export class gte {
	static validate(field, arg, fieldValue, row):boolean {
		return fieldValue >= arg
	}
}


export class lt {
	static validate(field, arg, fieldValue, row):boolean{
		return fieldValue < arg
	}
}


export class lte {
	static validate(field, arg, fieldValue, row):boolean {
		return  fieldValue <= arg
	}
}

export class not {
	static validate(field, arg, fieldValue, row):boolean {
		return fieldValue != arg
	}
}

export class eq {
	static validate(field, arg, fieldValue, row):boolean {
		return fieldValue == arg 
	}
}

export class contains {
	static validate(field, arg, fieldValue: any, row) {

		return fieldValue.some(r=> arg.includes(r))
		
	}
}

/**
 * @returns true when the given dict of key-value pairs are all contained in the field
 */
export class containsOBj {
	static validate(field, arg, fieldValue, row) {
		const keys = Object.keys(arg)

		for (let key of keys) {
			if(!fieldValue[key]) {
				return false
			}
		}

		return true
	}
}


export class containedBy {
	static validate(field, arg, arrayFieldValues, row) {

		for(let value of arrayFieldValues) {
			if(!arg.includes(value)) {
				return false
			}
		}

		return true
	}

}



export class overlap {
	static validate(field, arg, fieldValue, row) {
		return fieldValue.some(r=> arg.includes(r))
	}
}


export class len {
	static validate(field, arg, fieldValue: any[], row) {
		return fieldValue.length ==  arg
	}
}

export class hasKey {
	static validate(field, arg, fieldValue: any[], row) {

		const keys = Object.keys(arg)

		for (let key of keys) {
			if(!fieldValue[key]) {
				return false
			}
		}

	}
}

export class hasAnyKeys {
	static validate(field, arg, fieldValue, row) {

		return fieldValue.some(key=> !arg.includes(key))
	}
}


/**
 * @returns true when all of the given keys are in the data
 */
export 	class hasKeys {
	static validate(fieldObj, keys, fieldValue, row) {

		for (let fieldName of keys) {
			if(!fieldObj[fieldName]) {
				return false
			}
		}

		return true
	}
}

// Slice transforms


export class isNull {
	static validate(field, arg, fieldValue, row) {

		return  (fieldValue == null) == arg
	}
}