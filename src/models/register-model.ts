import { Model } from './model.js';
import { ModelReader } from './model.reader.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js'
import { indexedDB  } from './../connection/indexedDb/indexedb.js'
interface register {
  databaseName: string,
  version: number,
  type: 'indexeddb' | 'memory'
  models: typeof Model[]
}

export const models = {}
export const modelsConfig: {[key:string]: { DatabaseSchema:DatabaseSchema, TableSchema:TableSchema}} = {}


export class registerModel {
  static async register(entries: register) {
    
    const databaseSchema : DatabaseSchema  = {
      databaseName: entries.databaseName,
      version: entries.version,
      type: entries.type,
      stores: []
    };

    await entries.models.forEach(async(modelClassRepresentations, index) => {
      const {fields, modelName, attributes , fieldTypes} = ModelReader.read(modelClassRepresentations)
      
      const idFieldName = attributes?.primaryKey?.shift()

      databaseSchema.stores.push({
        name: modelName,
        id: { 
          keyPath: idFieldName || 'id', //by default primary key is id
          autoIncrement:   fields[idFieldName]? fields[idFieldName]?.primaryKey == true: true
        },
        fields: [],
      })

      await Object.entries(fields).forEach(async([fieldName, Field]) => {
        // dont register fields that is primary key and auto increment
        if(!(Field?.primaryKey && Field?.autoIncrement)) {
          
          databaseSchema.stores[index].fields.push({
            name: fieldName,
            keyPath: fieldName,
            options: { 
              unique: Field?.unique || false,
              type:  Field.type
            }
          })

        }
      })
      
    })

    if(databaseSchema.type =='indexeddb') {
      await indexedDB.migrate(databaseSchema)
    }

    await entries.models.forEach(async(modelClassRepresentations) => {
      modelClassRepresentations.setDBConfig(databaseSchema )
      
      const ModelName = modelClassRepresentations.getModelName()
      models[ModelName] = modelClassRepresentations

      const tableSchema = databaseSchema.stores.find((e)=> e.name == ModelName)

      modelsConfig[ModelName] = {
        DatabaseSchema: databaseSchema,
        TableSchema: tableSchema
      }

    })

  }
}