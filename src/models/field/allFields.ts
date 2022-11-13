import { FieldType } from '../../sql/query/interface.js'
import { field } from './field.js'
import { FieldKeys } from './fields.interface.js'
import { AutoFieldParams, BooleanFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams } from './interface.js'
import { BigIntegerFieldParams } from './interface.js'
import { CharFieldParams } from './interface.js'
import { TextFieldParams } from './interface.js'

export class AutoField extends field{

	fieldName: FieldKeys = 'AutoField'
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

	fieldName: FieldKeys = 'BigIntegerField'
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
			if(this?.blank  != true) {
				return false
			} else if (!(value === null || value === undefined)) {
				return false
			}
		} else if ( !this.rules(this, value)) {
			return false
		}

		return true
	}
}

export class BooleanField extends field{

	fieldName: FieldKeys = 'BooleanField'
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

	fieldName: FieldKeys = 'CharField'
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
			if(this?.blank  != true) {
				
				return false
			} else if (!(value === null || value === undefined)) {
				return false
			}
		} else if ( !this.rules(this, value)) {
			return false
		}
		return true

	}

}

export class DateField extends field{

	fieldName: FieldKeys = 'DateField'
	type = FieldType.DATE
	blank?: boolean
	default?: any
	
	constructor(data?:DateFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if(!(typeof value == 'string') ) {
			if(this?.blank  != true) {
				return false
			}
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return true
		}

		return false
	}
}

export class DateTimeField  extends field{

	fieldName: FieldKeys = 'DateTimeField'
	type = FieldType.DATE
	blank?: boolean
	default?: any
	
	constructor(data?:DateTimeFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if( !(typeof value == 'string')) {
			if(this?.blank  != true) {
				return false
			}
		} else if (!(this?.blank == undefined && this.isNull(value) == false)) {
			return false
		}

		return true
	}
}

export class indexedDBArrayField extends field {

	fieldName: FieldKeys = 'indexedDBArrayField'
	type = FieldType.ARRAY
	blank?: boolean
	default?: any
	maxLength?: number
	minLength?: number
	size?: number
	private _field?: any

	public get field() {
		return this._field
	}
	public set field(value) {
		this._field = value
	}
	
	constructor(data?:IndexedDBArrayFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if( !(Array.isArray(value))) {
			if(this?.blank  != true) {
				return false
			}
		} else if (this.isNull(value) == true) {
			if(this?.blank != true) {
				return false
			}
		} else if(this.size) {
			if(value.length != this.size) {
				return false
			}
		}

		if(this.field ) {
			for(const e of value) {
				if(!this.field.valid(e)) {
					return false
				}
			}
			
		}

		return true
	}
}

export class indexedDBJsonField extends field {

	fieldName: FieldKeys = 'indexedDBJsonField'
	type = FieldType.JSON
	blank?: boolean
	default?: any
	null?: boolean
	
	constructor(data?:IndexedDBJsonFieldParams) {
		super()
		Object.assign(this, data)
	}

	valid(value) {

		if(!(typeof value == 'object' && Array.isArray(value) == false) ) {
			if(this?.blank  != true) {
				return false
			}
			
		} else if (this.isNull(value) == true) {
			
		}
		return true
	}
}


export class TextField  extends field{

	fieldName: FieldKeys = 'TextField'
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
			if(this?.blank  != true) {
				return false
			} else if (!(value === null || value === undefined)) {
				return false
			}
		} else if ( !this.rules(this, value)) {
			return false
		}

		return true
	}
}

export class IntegerField extends field {
	
	fieldName: FieldKeys = 'IntegerField'
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
			} else if (!(value === null || value === undefined)) {
				return false
			}
		} else if ( !this.rules(this, value)) {
			return false
		}

		return true
	}
}

export class ForeignKey extends field {
	
	fieldName: FieldKeys = 'ForeignKey'
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
	
	fieldName: FieldKeys = 'ManyToManyField'
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

	fieldName: FieldKeys = 'ManyToManyField'
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