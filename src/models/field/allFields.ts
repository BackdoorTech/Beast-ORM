import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'
import { AutoFieldParams, BooleanFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams } from './interface.js'
import { BigIntegerFieldParams } from './interface.js'
import { CharFieldParams } from './interface.js'
import { TextFieldParams } from './interface.js'

export class AutoField extends field{

	unique = true
	autoIncrement = true
	primaryKey?: boolean
	type= FieldType.BIGINT
	blank = true
	default?: any

	constructor(data?: AutoFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if(!(typeof value == 'bigint' || typeof value == 'number')) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}

		return false
	}

}


export class BigIntegerField extends field{

	unique?: boolean
	primaryKey?: boolean
	blank?: boolean
	default?: any
	type = FieldType.BIGINT
	
	constructor(data?:BigIntegerFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {
		if( !(typeof value == 'bigint' || typeof value == 'number')) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}

		return true
	}
}

export class BooleanField extends field{

	unique?: boolean
	blank?: boolean
	default?: any

	constructor(data?: BooleanFieldParams) {
		super()
		Object.assign(this, data)
	}

	
	valid(value) {
	
		if( typeof value != 'boolean') {
			return false
		}


		return true
	}
}


export class CharField extends field{
	maxLength?:number | undefined
	minLength?:number | undefined
	choices?: any[] | undefined
	primaryKey?: boolean
	blank?: boolean
	default?: any
	unique?: boolean

	type = FieldType.DATE
	
	constructor(data?:CharFieldParams) {
		super()
		Object.assign(this, data);
	}

	valid(value) {

		if(!(typeof value == 'string')) {
			return false
		}

		return true

	}

}

export class DateField extends field{
	type = FieldType.DATE
	blank?: boolean
	default?: any
	
	constructor(data?:DateFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if(!(typeof value == 'string') ) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return true
		}

		return false
	}
}

export class DateTimeField  extends field{
	type = FieldType.DATE
	blank?: boolean
	default?: any
	
	constructor(data?:DateTimeFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if( !(typeof value == 'string')) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}

		return true
	}
}

export class indexedDBArrayField extends field {

	type = FieldType.ARRAY
	blank?: boolean
	default?: any
	
	constructor(data?:IndexedDBArrayFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if( !(Array.isArray(value))) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}

		return true
	}
}

export class indexedDBJsonField extends field {

	type = FieldType.JSON
	blank?: boolean
	default?: any
	
	constructor(data?:IndexedDBJsonFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if(!(typeof value == 'object' && Array.isArray(value) == false) ) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}
		return true
	}
}


export class TextField  extends field{
	maxLength?:number | undefined
	minLength?:number | undefined
	primaryKey?: boolean
	blank?: boolean
	default?: any

	type: FieldType.TEXT
	
	constructor(data?:TextFieldParams) {
		super()
		Object.assign(this, data);
	}


	valid(value) {

		if( !(typeof value == 'string') ) {
			return false
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}

		return true
	}
}

export class IntegerField extends field {
    
	unique?: boolean
	primaryKey?: boolean
	type = FieldType.INT
	blank?: boolean
	default?: any
	
	constructor(data?:IntegerFieldParams) {
		super()
		Object.assign(this, data);
	}

	valid(value) {

		if( !(typeof value == 'number')) {
			if(this?.blank  != true) {
				return false
			}
		} else if (this.isNull(value)) {
			if(this?.blank  != true) {
				return false
			}
		}

		return true
	}
}

export class ForeignKey extends field {
	
	model
	foreignKey = true
	blank?: boolean
	default?: any

	constructor(data?: ForeignKeyParams) {
		super()
		Object.assign(this, data);
	}


	valid(value) {
		return !this.isNull(value)
	}
}

export class OneToOneField extends field {
	
	foreignKey = true
	model
	blank?: boolean
	default?: any
	onDelete?: any
	primaryKey?:boolean

	constructor(data?: OneToOneFieldParams) {
		super()
		Object.assign(this, data);
	}

	contractor(contractor: any) {
		throw new Error('Method not implemented.')
	}

	valid(value) {
		return !this.isNull(value)
	}
}


export class ManyToManyField extends field {

	model
	foreignKey = true
	blank?: boolean
	default?: any
	onDelete?: any
	primaryKey?:boolean
	unique?: boolean


	constructor(data?:ManyToManyFieldParams) {
		super()
		Object.assign(this, data);
	}

	valid(value) {
		return !this.isNull(value)
	}
}