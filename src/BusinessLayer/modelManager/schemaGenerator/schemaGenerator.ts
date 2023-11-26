import { ModelReader } from './ModelReader.js'
import { IRegister } from '../../beastOrm.type.js'
import { FieldType } from './ModalReader.type.js'
import { IDatabaseSchema, ITableSchema } from '../../_interface/interface.type.js'
import { ManyToManyField } from '../../../Presentation/Model/fields/allFields.js'
import { middleTable } from '../relationships/middleTable.js'
import { Model } from '../../../Presentation/Api.js'
import { hashCode } from '../../../Utility/utils.js'


class SchemaGenerator {

  databases: {[key: string]: {
    tablesNames: string[]
    tableHash: {}
  }} = {}

  processingDatabase(DBname: string) {
    this.databases[DBname] = { tablesNames: [], tableHash: {}}
  }

  hasBeenProcessedDb(DBname: string) {
    return (this.databases[DBname] == null || this.databases[DBname] == undefined)? false : true
  }

  generate(entries: IRegister): IDatabaseSchema {
    const databaseSchema: IDatabaseSchema = {
      databaseName: entries.databaseName,
      type: entries.type,
      version: entries.version,
      table: [],
      middleTables: [],
    }

    if(this.hasBeenProcessedDb(entries.databaseName)) {
      return
    }

    this.processingDatabase(entries.databaseName)

    for (const modelClassRepresentations of entries.models) {

      const { tablesSchemas, middleTablesSchemas} = this.generateTableSchema(modelClassRepresentations, entries.databaseName)

      databaseSchema.table = databaseSchema.table.concat(tablesSchemas)
      databaseSchema.middleTables = databaseSchema.middleTables.concat(middleTablesSchemas)
    }


    return databaseSchema
  }


  private generateTableSchema(modelClassRepresentations: typeof Model<any>, databaseName) {

    const tablesSchemas: ITableSchema[] = []
    const middleTablesSchemas = []

    const {fields, attributes , fieldTypes, modelName, fieldNames, falseField} = ModelReader.read(modelClassRepresentations)
    const tableName = this.getModalName(modelName, databaseName, modelClassRepresentations)
    const id = this.makePrimary(fields, attributes)


    const tablesSchema: ITableSchema = {
      databaseName: databaseName,
      name: tableName,
      id: id,
      attributes: attributes,
      fields: [],
      fieldTypes,
      fieldNames,
      falseField,
      foreignKey: {},
      middleTablePK: {},
      middleTableRelatedFields: {}
    }

    const realFields =  Object.entries(fields).filter( ([fieldName, Field]) => {
      return Field.fieldName != "ManyToManyField"
    })

    for(let [fieldName, Field] of realFields) {
      delete Field?.["model"]
      tablesSchema.fields.push({
        name: fieldName,
        keyPath: fieldName,
        options: {
          unique: Field.unique,
          type: null
        },
        className: Field.fieldName,
        fieldAttributes: Object.assign({}, Field),
        blank: false
      })
    }
    tablesSchemas.push(tablesSchema)


    for(let [foreignKeyFieldName, Field] of  Object.entries(fields)) {
      if (Field instanceof ManyToManyField) {
        // current model modelClassRepresentations
        const modelName = ModelReader.getModelName(Field.model)
        const foreignKeyTableName = this.getModalName(modelName, databaseName,  Field.model)


        const middleTableSchema = middleTable.addMiddleTable(foreignKeyFieldName, foreignKeyTableName,  tableName, databaseName)
        middleTablesSchemas.push(middleTableSchema)
        tablesSchema.middleTablePK[foreignKeyFieldName] = { tableName: middleTableSchema.name}


        tablesSchema.middleTableRelatedFields[middleTableSchema.name] = { fieldName: foreignKeyFieldName}
      }
    }

    return {tablesSchemas, middleTablesSchemas}
  }

  private getModalName(modelName, databaseName, _Model: typeof Model<any>) {


    if(!this.hasRegisterModelName(databaseName, _Model)) {
      if(this.isModelNameAvailable(databaseName, modelName)) {
        this.registerModelName(databaseName, _Model, modelName)
        return modelName
      } else {
        const hasCode = hashCode(_Model.toString())
        this.registerModelName(databaseName, _Model, hasCode)
        return hasCode
      }
    } else {
      return this.getModelName(databaseName,  _Model)
    }
  }

  private getModelName (databaseName,  _Model: typeof Model<any>) {
    const hasCode = hashCode(_Model.toString())
    return this.databases[databaseName].tableHash[hasCode]
  }

  private registerModelName(databaseName, _Model: typeof Model<any>, name) {
    const hasCode = hashCode(_Model.toString())
    this.databases[databaseName].tableHash[hasCode] = name
    return this.databases[databaseName].tablesNames.push(name)
  }

  private isModelNameAvailable(databaseName, name) {
    return !this.databases[databaseName].tablesNames.includes(name)
  }

  private hasRegisterModelName(databaseName, _Model: typeof Model<any>) {
    const hasCode = hashCode(_Model.toString())
    return this.databases[databaseName].tableHash[hasCode]
  }

  private makePrimary(fields, attributes) {
    const idFieldName = attributes?.primaryKey?.shift()
    return {
      keyPath: idFieldName || 'id', //by default primary key is id
      autoIncrement:   fields[idFieldName]? fields[idFieldName]?.primaryKey == true: true,
      type: FieldType.INT
    }
  }


}

export const schemaGenerator = new SchemaGenerator()
