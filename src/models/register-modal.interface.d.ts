import { FieldType } from '../sql/query/model.js'

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
}

export interface DatabaseSchema {
	databaseName: string;
	type: 'indexedDB'
	version: number;
	stores: TableSchema[]
}