import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldsMap } from "../../../../../_src/models/field/fields.interface"
import { FieldSchema } from "../../../../../_src/models/register-modal.interface"
import { FieldType } from "../../../../../_src/sql/query/interface"

export interface ITableSchema {
	databaseName: string
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]>
	fieldTypes: FieldsMap<FieldKeys, string[]>
	middle?: boolean
}

export interface IDatabaseSchema {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: ITableSchema[]
}
