import { Model } from "../../Presentation/Api"
import { AttributesMap, FieldAttributesKeys, FieldKeys, FieldType, FieldsMap } from "../fields/fields.type"
import { PossibleFieldAttributes } from "../fields/fieldsParameters.type"

export interface IFieldSchema {
	name: string,
	keyPath: string,
	className?: FieldKeys,
	fieldAttributes?: PossibleFieldAttributes,
  blank: boolean
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
  foreignKey: {[fieldName: string]: { tableName: string}}
  middleTablePK: {[fieldName: string]: { tableName: string}}
  middleTableRelatedFields: {[middleTableName: string]: { fieldName: string}},
	middle?: boolean,
  fieldNames: string[],
  falseField: string[],
}

export interface IDatabaseSchema {
	databaseName: string;
	type: 'indexedDB' | 'localStorage'
	version: number;
	webWorker?:boolean,
	table: ITableSchema[],
  middleTables: ITableSchema[],
}



export interface IMethodWithModels {
  Model: typeof Model<any>,
  func: {
    name:  string,
    function: Function
  }[]
}
