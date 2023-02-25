import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from './interface.js'


import * as Fields from './allFields.js'

export function CharField(data?: CharFieldParams) {
    return new Fields.CharField(data) as any 
}


export function BooleanField (data?:BooleanFieldParams) {
	return new Fields.BooleanField(data) as any
}

export function TextField(data?: TextFieldParams) {
	return new Fields.TextField(data) as any
}

export function IntegerField(data?:IntegerFieldParams) {
	return new Fields.IntegerField(data) as any
}

export function DateField(data?:DateFieldParams) {
	return new Fields.DateField(data) as any
}

export function DateTimeField(data?:  DateTimeFieldParams) {
	return new Fields.DateTimeField(data) as any
}
export function BigIntegerField(data?:BigIntegerFieldParams) {
	return new Fields.BigIntegerField(data) as any
}

export function AutoField (data?: AutoFieldParams) {
	return new Fields.AutoField(data) as any
}


export const  indexedDB = {
	fields: {
		JsonField: (data?:IndexedDBJsonFieldParams) => new Fields.indexedDBJsonField(data) as any,
		ArrayField: (data?:IndexedDBArrayFieldParams) => new Fields.indexedDBArrayField(data) as any
	}
}


export  function OneToOneField(data:OneToOneFieldParams) {
	return new Fields.OneToOneField(data) as any
}


export  function ForeignKey(data:ForeignKeyParams) {
	return new Fields.ForeignKey(data) as any
}


export  function ManyToManyField(data?:ManyToManyFieldParams) {
	return new Fields.ManyToManyField(data) as any
}
