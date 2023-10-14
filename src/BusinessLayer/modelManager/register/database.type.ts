import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap } from "../schemaGenerator/ModalReader.type.js"
import { FieldSchema, TableSchema } from "../schemaGenerator/schemaGenerator.type.js"


export interface IConfig {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: TableSchema[]
}
