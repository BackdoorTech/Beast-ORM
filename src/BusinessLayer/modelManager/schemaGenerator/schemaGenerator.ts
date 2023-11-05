import { ModelReader } from './ModelReader.js'
import { IRegister } from '../../beastOrm.type.js'
import { FieldType } from './ModalReader.type.js'
import { IDatabaseSchema } from '../../_interface/interface.js'
import { RuntimeMethods as RM } from '../runtimeMethods/runTimeMethods.js'



class SchemaGenerator {
  generate(entries: IRegister): IDatabaseSchema {


    const databaseSchema: IDatabaseSchema = {
      databaseName: entries.databaseName,
      type: entries.type,
      version: entries.version,
      table: [],
    }

    for (const modelClassRepresentations of entries.models) {
      const {fields, attributes , fieldTypes, modelName, fieldNames} = ModelReader.read(modelClassRepresentations)
      const otherTablesName = databaseSchema.table!.map(e => e.name)

      const tableName = this.getModalName(
        databaseSchema.databaseName,
        otherTablesName,
        modelName
      )

      const id = this.makePrimary(fields, attributes)

      const tablesSchema = {
        databaseName: databaseSchema.databaseName,
        name: tableName,
        id: id,
        attributes: attributes,
        fields: [],
        fieldTypes,
        fieldNames
      }

      for(const [fieldName, Field] of  Object.entries(fields)) {
        tablesSchema.fields.push({
          name: fieldName,
          keyPath: fieldName,
          options: {
            unique: false,
            type:  null
          },
          className: Field?.['fieldName'],
          fieldAttributes:  Object.assign({}, Field)
        })
      }

      databaseSchema.table!.push(tablesSchema)
    }

    return databaseSchema
  }

  private getModalName(databaseName, otherModelNames, modelName) {
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

      entries.models[index].prototype[RM.getTableSchema] = () => {
        return tableSchemaClass;
      }
    }
  }




}


export const schemaGenerator = new SchemaGenerator()
