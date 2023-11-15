import { ModelReader } from './ModelReader.js'
import { IRegister } from '../../beastOrm.type.js'
import { FieldType } from './ModalReader.type.js'
import { IDatabaseSchema, ITableSchema } from '../../_interface/interface.type.js'
import { RuntimeMethods as RM } from '../runtimeMethods/runTimeMethods.js'
import { GustPrototype, RealPrototype } from '../../../Presentation/Model/fields/fieldsWrappers.js'
import { ForeignKey, ManyToManyField } from '../../../Presentation/Model/fields/allFields.js'
import { middleTable } from '../relationships/middleTable.js'
import { Model } from '../../../Presentation/Api.js'
import { getArgIdWithT, getIdObject, getIdObjectWithT } from '../../../Utility/Model/utils.js'


class SchemaGenerator {

  databases: {[key: string]: {
    tablesNames: []
  }} = {}

  processingDatabase(DBname: string) {
    this.databases[DBname] = { tablesNames: []}
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
      middleTables: []
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

    // console.log({databaseSchema});

    return databaseSchema
  }


  private generateTableSchema(modelClassRepresentations: typeof Model<any>, databaseName) {

    const tablesSchemas: ITableSchema[] = []
    const middleTablesSchemas = []

    const {fields, attributes , fieldTypes, modelName, fieldNames} = ModelReader.read(modelClassRepresentations)
    const tableName = this.getModalName(modelName)
    const id = this.makePrimary(fields, attributes)

    const tablesSchema: ITableSchema = {
      databaseName: databaseName,
      name: tableName,
      id: id,
      attributes: attributes,
      fields: [],
      fieldTypes,
      fieldNames,
      foreignKey: {}
    }



    for(let [fieldName, Field] of  Object.entries(fields)) {
      delete Field?.["model"]
      tablesSchema.fields.push({
        name: fieldName,
        keyPath: fieldName,
        options: {
          unique: false,
          type: null
        },
        className: Field?.['fieldName'],
        fieldAttributes: Object.assign({}, Field),
        blank: false
      })
    }
    tablesSchemas.push(tablesSchema)


    for(let [fieldName, Field] of  Object.entries(fields)) {
      if (Field instanceof ForeignKey) {
        const middleTableSchema =  middleTable.addMiddleTable(fieldName, databaseName, tableName)
        middleTablesSchemas.push(middleTableSchema)
        tablesSchema.foreignKey[fieldName] = { tableName: tableName}
      } else if (Field instanceof ManyToManyField) {
        const middleTableSchema = middleTable.addMiddleTable(fieldName, databaseName, tableName)
        middleTablesSchemas.push(middleTableSchema)
        tablesSchema.foreignKey[fieldName] = { tableName: tableName}
      }
    }

    return {tablesSchemas, middleTablesSchemas}
  }

  private getModalName(modelName) {
    return modelName
  }

  private makePrimary(fields, attributes) {
    const idFieldName = attributes?.primaryKey?.shift()
    return {
      keyPath: idFieldName || 'id', //by default primary key is id
      autoIncrement:   fields[idFieldName]? fields[idFieldName]?.primaryKey == true: true,
      type: FieldType.INT
    }
  }

  /**
   * Attaches generated table schema to model classes.
   * @param {DatabaseSchema} databaseSchema - The database schema to extract table information from.
   * @param {Object} entries - An object containing model classes.
   */
  attachGeneratedTableSchemaToModel(databaseSchema:IDatabaseSchema, entries: IRegister) {
    for (let index = 0; index < entries.models.length; index++) {

      // Get the table schema class for the current model.
      const tableSchemaClass = databaseSchema.table[index];

      // Add a static method to the model for accessing the table schema.
      entries.models[index][RM.getTableSchema] = () => {
        return tableSchemaClass;
      }

      RealPrototype()
      const model = new  entries.models[index]
      GustPrototype()

      entries.models[index].getModelSchema = () => {
        return model
      }


      entries.models[index].prototype[RM.getTableSchema] = () => {
        return tableSchemaClass;
      }
    }
  }

  attachMiddleTablesModel(databaseSchema:IDatabaseSchema, entries: IRegister , _MiddleModels: typeof Model<any>[]) {

    for (let index = 0; index < databaseSchema.table.length; index++) {

      const currentModel: typeof Model<any> = entries.models[index]

      const foreignKeyObject = databaseSchema.table[index].foreignKey
      const foreignKeyLength = Object.keys(foreignKeyObject).length

      if(foreignKeyLength>=1) {
        for (const [fieldName, Field] of  Object.entries(foreignKeyObject)) {
          const middleTableName = Field.tableName
          const middleTableModel = _MiddleModels.find(e => e.getTableSchema().name == middleTableName)

          currentModel.prototype[fieldName+"Add"] = function(Model: Model<any>) {

            const parameters = {}

            parameters["iD"+fieldName] = getArgIdWithT(currentModel, this)
            parameters["iD"+middleTableName] = getArgIdWithT(middleTableModel, Model)

            return middleTableModel.create(parameters)

          }
        }
      }

    }

  }


}


export const schemaGenerator = new SchemaGenerator()
