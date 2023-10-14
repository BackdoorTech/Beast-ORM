import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap } from "../schemaGenerator/ModalReader.type"
import { FieldSchema } from "../schemaGenerator/schemaGenerator.type"


export interface IConfig {
	databaseName: string
	name: string,
	id: { keyPath: string , autoIncrement?: boolean , type:  FieldType},
	fields: FieldSchema[]
	attributes: AttributesMap<FieldAttributesKeys, string[]>
	fieldTypes: FieldsMap<FieldKeys, string[]>
	middle?: boolean
}

