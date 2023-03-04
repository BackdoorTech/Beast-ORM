import { FieldType } from '../sql/query/interface.js'
import { FieldsMap, FieldKeys, FieldKeysArray, AttributesMap, FieldAttributesKeys } from './field/fields.interface.js'
import { PossibleFieldAttributes} from './field/interface.js'

export interface FieldSchema {
	name: string, 
	keyPath: string, 
	className?: FieldKeys,
	fieldAttributes?: PossibleFieldAttributes,
	options?: { 
		unique?: boolean,
		type:  FieldType
	}
}

export interface TableSchema {
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]> 
	fieldTypes: FieldsMap<FieldKeys, string[]>
}

export interface DatabaseSchema {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	stores?: TableSchema[]
}

export interface TableSchemaLocalStorage {
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]> 
	fieldTypes: FieldsMap<FieldKeys, string[]>
}

export interface DatabaseSchemaLocalStorage {
	databaseName: string;
	type: 'localStorage'
	version: number;
	webWorker?:boolean,
	stores?: TableSchemaLocalStorage[]
}