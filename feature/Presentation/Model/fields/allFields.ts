import { FieldKeys, TextFieldParams, BigIntegerFieldParams, CharFieldParams, AutoFieldParams, BooleanFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, FieldType, field } from './allFields.type'




/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export class AutoField  extends field implements AutoFieldParams{

	fieldName: FieldKeys = 'AutoField'
	unique = true
	autoIncrement = true
  blank = true

	constructor(data?:AutoFieldParams) {
		super()
		Object.assign(this, data)
	}
}

/**
 * Represents a BigIntegerField, a field for storing large integer values.
 */
export class BigIntegerField extends field implements AutoFieldParams{

	fieldName: FieldKeys = 'BigIntegerField'
	type = FieldType.BIGINT

	constructor(data?:BigIntegerFieldParams) {
		super()
		Object.assign(this, data)
	}
}

/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export class BooleanField extends field implements BooleanFieldParams{

	fieldName: FieldKeys = 'BooleanField'

	constructor(data?: BooleanFieldParams) {
		super()
		Object.assign(this, data)
	}

}

/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export class CharField extends field implements CharFieldParams{

	fieldName: FieldKeys = 'CharField'
	type = FieldType.DATE

	constructor(data?:CharFieldParams) {
		super()
		Object.assign(this, data);
	}


}


export class DateField extends field implements DateFieldParams{

	fieldName: FieldKeys = 'DateField'
	type = FieldType.DATE

	constructor(data?:DateFieldParams) {
		super()
		Object.assign(this, data)
	}

}

export class DateTimeField  extends field implements DateTimeFieldParams{

	fieldName: FieldKeys = 'DateTimeField'
	type = FieldType.DATE

	constructor(data?:DateTimeFieldParams) {
		super()
		Object.assign(this, data)
	}

}
/**
 * Represents a CharField, a field for storing array.
 */
export class indexedDBArrayField extends field implements IndexedDBArrayFieldParams {

	fieldName: FieldKeys = 'indexedDBArrayField'
	type = FieldType.ARRAY
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

}
/**
 * Represents a CharField, a field for storing json.
 */
export class indexedDBJsonField extends field implements IndexedDBJsonFieldParams {

	fieldName: FieldKeys = 'indexedDBJsonField'
	type = FieldType.JSON

	constructor(data?:IndexedDBJsonFieldParams) {
		super()
		Object.assign(this, data)
	}


}

/**
 * Represents a CharField, a field for storing large text
 */
export class TextField  extends field implements TextFieldParams{

	fieldName: FieldKeys = 'TextField'
	type: FieldType.TEXT

	constructor(data?:TextFieldParams) {
		super()
		Object.assign(this, data);
	}


}

/**
 * Represents a CharField, a field for storing integer
 */
export class IntegerField extends field implements IntegerFieldParams{

	fieldName: FieldKeys = 'IntegerField'
	type = FieldType.INT

	constructor(data?:IntegerFieldParams) {
		super()
		Object.assign(this, data);
	}


}

export class ForeignKey extends field implements ForeignKeyParams{

	fieldName: FieldKeys = 'ForeignKey'
  model
	foreignKey = true

	constructor(data?: ForeignKeyParams) {
		super()
		Object.assign(this, data);
	}


}

export class OneToOneField extends field implements OneToOneFieldParams{

	fieldName: FieldKeys = 'OneToOneField'
	foreignKey = true
	model

	constructor(data?: OneToOneFieldParams) {
		super()
		Object.assign(this, data);
	}


}


export class ManyToManyField extends field implements ManyToManyFieldParams{

	fieldName: FieldKeys = 'ManyToManyField'
	model
	foreignKey = true

	constructor(data?:ManyToManyFieldParams) {
		super()
		Object.assign(this, data);
	}


}
