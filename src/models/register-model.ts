import { Model } from './model.js';
import { ModelReader } from './model.reader.js'
import { DatabaseSchema  } from './register-modal.interface.js'
import { indexedDB  } from './../connection/indexedDb/indexedb.js'
interface register {
  databaseName: string,
  version: number,
  type: 'indexeddb' | 'memory'
  models: typeof Model[]
}

export const models = {}

export class registerModel {
  static register(entries: register) {
    
    const databaseSchema : DatabaseSchema  = {
      databaseName: entries.databaseName,
      version: entries.version,
      type: entries.type,
      stores: []
    };

    entries.models.forEach((modelClassRepresentations, index) => {
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

      Object.entries(fields).forEach(([fieldName, Field]) => {
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
      indexedDB.migrate(databaseSchema)
    }

    entries.models.forEach((modelClassRepresentations) => {
      modelClassRepresentations.setDBConfig(databaseSchema )
      
      const ModelName = modelClassRepresentations.getModelName()
      models[ModelName] = modelClassRepresentations
    })

  }
}