import { FieldType } from '../sql/query/model.js'
import { FieldsMap, FieldKeys, FieldKeysArray, AttributesMap, FieldAttributesKeys } from './field/fields.interface.js'

export interface FieldSchema {
	name: string, 
	keyPath: string, 
	options?: { 
		unique?: boolean,
		type:  FieldType
	}
}

export interface TableSchema {
	name: string,
	id: { keyPath: string , autoIncrement?: boolean },
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]> = {}
}

export interface DatabaseSchema {
	databaseName: string;
	type: 'indexedDB'
	version: number;
	stores: TableSchema[]
}