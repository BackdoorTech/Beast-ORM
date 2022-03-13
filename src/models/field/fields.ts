import {CharField as _CharField} from './char-field.js'
import {JsonField as _JsonField} from './json-field.js'
import { BooleanField as _BooleanField } from './boolean-field.js'
import { TextField as _TextField} from './text-field.js'
import { IntegerField as _IntegerField} from './integer-field.js'
import { DateField as _DateField} from './date-field.js'
import { BigIntegerField as _BigIntegerField} from './big-integer-field.js'
import { AutoFieldParams, CharFieldParams, IntegerFieldParams, TextFieldParams } from './interface.js'
import { AutoField as _AutoField } from './auto-field.js'
import {indexedDBJsonField} from './indexedDB-json-field.js'
import {indexedDBArrayField } from './indexedDB-array-field.js'

export function CharField(data?: CharFieldParams) {
    return new _CharField(data)
}

export function JsonField() {
	return new _JsonField()
}

export function BooleanField () {
	return new _BooleanField()
}

export function TextField(data?: TextFieldParams) {
	return new _TextField(data)
}

export function IntegerField(data?:IntegerFieldParams) {
	return new _IntegerField(data)
}

export function DateField() {
	return new _DateField()
}

export function BigIntegerField() {
	return new _BigIntegerField()
}

export function AutoField (data: AutoFieldParams) {
	return new _AutoField(data)
}


export const  indexedDB = {
	fields: {
		JsonField: () => new indexedDBJsonField(),
		ArrayField: ({type=null}) => new indexedDBArrayField({type})
	}
}