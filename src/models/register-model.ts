import { Model } from './model.js';
import { ModelReader } from './model.reader.js';
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { indexedDB  } from './../connection/indexedDb/indexedb.js';
import { OneToOneField, ForeignKey } from './field/allFields.js';
import { uncapitalize } from '../utils.js';

interface register {
  databaseName: string,
  version: number,
  type: 'indexedDB'
  models: typeof Model[]
}

export const models = {}
export const modelsConfig: {[key:string]: { 
  DatabaseSchema:DatabaseSchema,
  TableSchema:TableSchema,
  OneToOneField?: {[key:string]: {}} 
  }} = {}


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
        attributes: attributes,
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

        if(Field instanceof OneToOneField) {
          ModelEditor.addMethodOneToOneField(Field, fieldName, modelName)
        } else if (Field instanceof ForeignKey) {
          ModelEditor.addMethodForeignKey(Field, fieldName, modelName)
        }

      })
      
    })

    if(databaseSchema.type =='indexedDB') {
      await indexedDB.migrate(databaseSchema)
    }

    await entries.models.forEach(async(modelClassRepresentations) => {
      
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


export class ModelEditor {
  static addMethodOneToOneField(foreignKeyField:OneToOneField, FieldName:string, modelName:string) {

    const foreignKeyFieldModel: Model = foreignKeyField.model
    const modelNameLowCase = uncapitalize(modelName)

    foreignKeyFieldModel['prototype'][modelNameLowCase] = async function (body) {

      const obj ={}
      obj[FieldName] = this.getPrimaryKeyValue()

      const foreignModel: Model = models[modelName]

      return await foreignModel.get(obj)

    }

  }

  static addMethodForeignKey(foreignKeyField:ForeignKey, FieldName:string, modelName:string) {
    
    const foreignKeyFieldModel: Model = foreignKeyField.model
    const FunctionName = uncapitalize(modelName)

    foreignKeyFieldModel['prototype'][FunctionName+'SetAll'] = async function () {

      const obj = {}
      obj[FieldName] = this.getPrimaryKeyValue()
      
      const foreignModel: Model = models[modelName]

      console.log(obj, 'obj')

      return await foreignModel.filter(obj).execute()

    }

  }
}