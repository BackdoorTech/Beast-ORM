import * as Fields from './allFields'
import { AutoFieldParams, BigIntegerFieldParams, BooleanFieldParams, CharFieldParams, DateFieldParams, DateTimeFieldParams, ForeignKeyParams, IndexedDBArrayFieldParams, IndexedDBJsonFieldParams, IntegerFieldParams, ManyToManyFieldParams, OneToOneFieldParams, TextFieldParams } from './allFields.type.js'

export function CharField(data?: CharFieldParams): string {
  return new Fields.CharField(data) as any
}

export function BooleanField (data?:BooleanFieldParams): boolean {
	return new Fields.BooleanField(data) as any
}

export function TextField(data?: TextFieldParams): string {
	return new Fields.TextField(data) as any
}

export function IntegerField(data?:IntegerFieldParams): number {
	return new Fields.IntegerField(data) as any
}

export function DateField(data?:DateFieldParams): Date {
	return new Fields.DateField(data) as any
}

export function DateTimeField(data?:  DateTimeFieldParams): string {
	return new Fields.DateTimeField(data) as any
}
export function BigIntegerField(data?:BigIntegerFieldParams): number {
	return new Fields.BigIntegerField(data) as any
}

export function AutoField (data?: AutoFieldParams) {
	return new Fields.AutoField(data) as any
}


export const  indexedDB = {
	fields: {
		JsonField: (data?:IndexedDBJsonFieldParams): Object => new Fields.indexedDBJsonField(data) as any,
		ArrayField: (data?:IndexedDBArrayFieldParams): any[] => new Fields.indexedDBArrayField(data) as any
	}
}


export  function OneToOneField(data:OneToOneFieldParams): string | number {
	return new Fields.OneToOneField(data) as any
}


export  function ForeignKey(data:ForeignKeyParams): string | number {
	return new Fields.ForeignKey(data) as any
}


export  function ManyToManyField(data?:ManyToManyFieldParams): string | number {
	return new Fields.ManyToManyField(data) as any
}
