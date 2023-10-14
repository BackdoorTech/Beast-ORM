import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap } from "../schemaGenerator/ModalReader.type.js"
import { FieldSchema } from "../schemaGenerator/schemaGenerator.type.js"


export interface IConfig {
	databaseName: string
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]>
	fieldTypes: FieldsMap<FieldKeys, string[]>
	middle?: boolean
}

