import { FieldKeys, FieldType } from '../../../BusinessLayer/fields/fields.type.js'
import { AutoFieldBL, BigIntegerFieldBL, BooleanFieldBL, CharFieldBL, DateFieldBL, DateTimeFieldBL, ForeignKeyBL, IntegerFieldBL, TextFieldBL, indexedDBArrayFieldBL, indexedDBJsonFieldBL } from '../../../BusinessLayer/validation/fields/allFields.js'
import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from '../../../BusinessLayer/fields/fieldsParameters.type.js'
import { field } from '../../../BusinessLayer/validation/fields/allFields.type.js'



/**
 * Represents an AutoField, an automatically incrementing field for primary keys.
 */
export class AutoField  extends AutoFieldBL {

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
export class BigIntegerField extends BigIntegerFieldBL{

	fieldName: FieldKeys = 'BigIntegerField'
	type = FieldType.BIGINT
  blank = false

	constructor(data?:BigIntegerFieldParams) {
		super()
		Object.assign(this, data)
	}
}

/**
 * Represents a BooleanField, a field for storing boolean values.
 */
export class BooleanField extends BooleanFieldBL{

	fieldName: FieldKeys = 'BooleanField'
  blank = false

	constructor(data?: BooleanFieldParams) {
		super()
		Object.assign(this, data)
	}

}

/**
 * Represents a CharField, a field for storing text with a specified length.
 */
export class CharField extends CharFieldBL{

	fieldName: FieldKeys = 'CharField'
	type = FieldType.DATE
  blank = false

	constructor(data?:CharFieldParams) {
		super()
		Object.assign(this, data);
	}


}


export class DateField extends DateFieldBL{

	fieldName: FieldKeys = 'DateField'
	type = FieldType.DATE
  blank = false

	constructor(data?:DateFieldParams) {
		super()
		Object.assign(this, data)
	}

}

export class DateTimeField  extends DateTimeFieldBL{

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
export class indexedDBArrayField extends indexedDBArrayFieldBL {

	fieldName: FieldKeys = 'indexedDBArrayField'
	type = FieldType.ARRAY
  blank = false

	constructor(data?:IndexedDBArrayFieldParams) {
		super()
		Object.assign(this, data)
	}

}
/**
 * Represents a CharField, a field for storing json.
 */
export class indexedDBJsonField extends indexedDBJsonFieldBL {

	fieldName: FieldKeys = 'indexedDBJsonField'
	type = FieldType.JSON
  blank = false

	constructor(data?:IndexedDBJsonFieldParams) {
		super()
		Object.assign(this, data)
	}


}

/**
 * Represents a CharField, a field for storing large text
 */
export class TextField  extends TextFieldBL{

	fieldName: FieldKeys = 'TextField'
	type: FieldType.TEXT
  blank = false

	constructor(data?:TextFieldParams) {
		super()
		Object.assign(this, data);
	}


}

/**
 * Represents a CharField, a field for storing integer
 */
export class IntegerField extends IntegerFieldBL{

	fieldName: FieldKeys = 'IntegerField'
	type = FieldType.INT
  blank = false

	constructor(data?:IntegerFieldParams) {
		super()
		Object.assign(this, data);
	}


}

export class ForeignKey extends ForeignKeyBL{

	fieldName: FieldKeys = 'ForeignKey'
  model
	foreignKey = true
  blank = false

	constructor(data?: ForeignKeyParams) {
		super()
		Object.assign(this, data);
	}


}

export class OneToOneField extends field implements OneToOneFieldParams{

	fieldName: FieldKeys = 'OneToOneField'
	foreignKey = true
  blank = false
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
  blank = false

	constructor(data?:ManyToManyFieldParams) {
		super()
		Object.assign(this, data);
	}


}
