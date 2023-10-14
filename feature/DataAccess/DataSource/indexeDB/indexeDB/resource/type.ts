import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap, PossibleFieldAttributes } from "../../../../../Presentation/Model/fields/allFields.type"

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
	databaseName: string
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]>
	fieldTypes: FieldsMap<FieldKeys, string[]>
	middle?: boolean
}

export interface DatabaseSchema {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: TableSchema[]
}
