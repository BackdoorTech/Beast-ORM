import { FieldType } from '../../sql/query/interface.js'
import { Model } from '../model.js'
import { modelsConfig } from '../register-model.js'
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

    constructor(data?: AutoFieldParams) {
		super()
    	Object.assign(this, data)
	}

}


export class BigIntegerField extends field{

		unique?: boolean
	primaryKey?: boolean

	type = FieldType.BIGINT
	
	constructor(data?:BigIntegerFieldParams) {
		super()
		Object.assign(this, data)
	}
}

export class BooleanField extends field{
	constructor(data?: BooleanFieldParams) {
		super()
		Object.assign(this, data)
	}
}


export class CharField extends field{
	maxLength?:number | undefined
	minLength?:number | undefined
	choices?: any[] | undefined
	primaryKey?: boolean

	type = FieldType.DATE
	
	constructor(data?:CharFieldParams) {
		super()
		Object.assign(this, data);
	}

}

export class DateField extends field{
	type = FieldType.DATE
	
	constructor(data?:DateFieldParams) {
		super()
		Object.assign(this, data)
	}
}

export class DateTimeField  extends field{
	type = FieldType.DATE
	
	constructor(data?:DateTimeFieldParams) {
		super()
		Object.assign(this, data)
	}
}

export class indexedDBArrayField extends field {

	type = FieldType.ARRAY
	
	constructor(data?:IndexedDBArrayFieldParams) {
		super()
		Object.assign(this, data)
	}
}

export class indexedDBJsonField extends field {

	type = FieldType.JSON
	
	constructor(data?:IndexedDBJsonFieldParams) {
		super()
		Object.assign(this, data)
	}
}




export class TextField  extends field{
	maxLength?:number | undefined
	minLength?:number | undefined
	primaryKey?: boolean

	type: FieldType.TEXT
	
	constructor(data?:TextFieldParams) {
		super()
		Object.assign(this, data);
	}
}

export class IntegerField extends field {
    
	unique?: boolean
	primaryKey?: boolean
	type = FieldType.INT
	
	constructor(data?:IntegerFieldParams) {
		super()
		Object.assign(this, data);
	}
}

export class ForeignKey extends field {
	
	model
	foreignKey = true

	constructor(data?: ForeignKeyParams) {
		super()
		Object.assign(this, data);
	}
}

export class OneToOneField extends field {
	
	foreignKey = true
	model

	constructor(data?: OneToOneFieldParams) {
		super()
		Object.assign(this, data);
	}

	contractor(contractor: any) {
		throw new Error('Method not implemented.')
	}
}


export class ManyToManyField extends field {

	model
	foreignKey = true

	constructor(data?:ManyToManyFieldParams) {
		super()
		Object.assign(this, data);
	}
}