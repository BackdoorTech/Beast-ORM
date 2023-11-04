import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap } from "../../BusinessLayer/fields/fields.type"
import { PossibleFieldAttributes } from "../../BusinessLayer/fields/fieldsParameters.type"

export interface IFieldSchema {
	name: string,
	keyPath: string,
	className?: FieldKeys,
	fieldAttributes?: PossibleFieldAttributes,
	options?: {
		unique?: boolean,
		type:  FieldType
	}
}

export interface ITableSchema {
	databaseName: string
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: IFieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]>
	fieldTypes: FieldsMap<FieldKeys, string[]>
	middle?: boolean,
  fieldNames: string[],
}

export interface IDatabaseSchema {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: ITableSchema[]
}
