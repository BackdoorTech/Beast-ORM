import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from './interface.js'


import * as Fields from './allFields.js'

export function CharField(data?: CharFieldParams) {
    return new Fields.CharField(data)
}


export function BooleanField (data?:BooleanFieldParams) {
	return new Fields.BooleanField(data)
}

export function TextField(data?: TextFieldParams) {
	return new Fields.TextField(data)
}

export function IntegerField(data?:IntegerFieldParams) {
	return new Fields.IntegerField(data)
}

export function DateField(data?:DateFieldParams) {
	return new Fields.DateField(data)
}

export function DateTimeField(data?:  DateTimeFieldParams) {
	return new Fields.DateTimeField(data)
}
export function BigIntegerField(data?:BigIntegerFieldParams) {
	return new Fields.BigIntegerField(data)
}

export function AutoField (data?: AutoFieldParams) {
	return new Fields.AutoField(data)
}


export const  indexedDB = {
	fields: {
		JsonField: (data?:IndexedDBJsonFieldParams) => new Fields.indexedDBJsonField(data),
		ArrayField: (data?:IndexedDBArrayFieldParams) => new Fields.indexedDBArrayField(data)
	}
}


export  function OneToOneField(data:OneToOneFieldParams) {
	return new Fields.OneToOneField(data)
}


export  function ForeignKey(data:ForeignKeyParams) {
	return new Fields.ForeignKey(data)
}


export  function ManyToManyField(data?:ManyToManyFieldParams) {
	return new Fields.ManyToManyField(data)
}
