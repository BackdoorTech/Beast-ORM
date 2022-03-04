import { Model } from './model.js';
import { ModelReader } from './model.reader.js'
import { DatabaseSchema  } from './register-modal.interface.js'

interface register {
  databaseName: string,
  version: number,
  type: 'indexeddb' | 'memory'
  models: typeof Model[]
}


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

      databaseSchema.stores.push({
        name: modelName,
        id: { 
          keyPath: attributes?.primaryKey?.shift() || 'id',
          autoIncrement: attributes?.primaryKey?.shift() == undefined 
        },
        fields: [],
      })

      Object.entries(fields).forEach(([fieldName, Field]) => {
        databaseSchema.stores[index].fields.push({
          name: fieldName,
          keyPath: fieldName,
          options: { 
            unique: Field?.unique || false,
            type:  Field.type
          }
        })
      })
      
    })

        
    entries.models.forEach((modelClassRepresentations) => {
      modelClassRepresentations.setDBConfig(databaseSchema )
    })

  }
}