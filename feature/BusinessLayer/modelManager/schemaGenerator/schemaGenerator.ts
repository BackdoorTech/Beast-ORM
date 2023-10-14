import { Model } from '../../../Presentation/Api'
import { ModelReader } from './ModelReader'
import { register } from '../../beastOrm.type'
import { FieldType } from './ModalReader.type'
import { DatabaseSchema } from './schemaGenerator.type'
class SchemaGenerator {
  generate(entries: register) {


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

  attacheGeneratedTableSchemaToModel() {}
}


export const schemaGenerator = new SchemaGenerator()
