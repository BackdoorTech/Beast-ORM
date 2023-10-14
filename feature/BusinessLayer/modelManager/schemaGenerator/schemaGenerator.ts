import { Model } from '../../../Presentation/Api'
import { ModelReader } from './ModelReader'
import { register } from '../../beastOrm.type'
import { FieldType } from './ModalReader.type'
import { DatabaseSchema } from './schemaGenerator.type'
class SchemaGenerator {
  generate(entries: register): DatabaseSchema {


    const databaseSchema: DatabaseSchema = {
      databaseName: entries.databaseName,
      type: entries.type,
      version: entries.version,
      table: []
    }

    for (const modelClassRepresentations of entries.models) {
      const {fields, attributes , fieldTypes, modelName} = ModelReader.read(modelClassRepresentations)
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
        fieldTypes
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
  attachGeneratedTableSchemaToModel(databaseSchema:DatabaseSchema, entries: register) {
    for (let index = 0; index < entries.models.length; index++) {

      // Get the table schema class for the current model.
      const tableSchemaClass = databaseSchema.table[index];

      // Add a prototype method to the model for accessing the table schema.
      entries.models[index].prototype.getTableSchema = () => {
          return tableSchemaClass;
      }

      // Add a static method to the model for accessing the table schema.
      entries.models[index].getTableSchema = () => {
          return tableSchemaClass;
      }
    }
  }




}


export const schemaGenerator = new SchemaGenerator()
