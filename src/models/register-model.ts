import { Model, LocalStorage } from './model.js';
import { LocalStorageModelReader, ModelReader } from './model.reader.js';
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchema, TableSchemaLocalStorage  } from './register-modal.interface.js';
import { OneToOneField, ForeignKey, ManyToManyField } from './field/allFields.js';
import { hashCode, uncapitalize, uniqueGenerator } from '../utils.js';
import { FieldType } from '../sql/query/interface.js';
import { ModelMigrations } from './mode-migrations.js'
import { ModelAPIRequest } from './model-manager.js';
import { transactionOnCommit } from '../triggers/transaction.js';
import { DatabaseManagerSchema } from './schema/databae-manager-schema.js';

/**
 * @interface register
 * @description Represents the configuration options for registering models.
 * @property {string} databaseName - The name of the database.
 * @property {number} version - The version of the database schema.
 * @property {'indexedDB' | 'localStorage'} type - The type of storage ('indexedDB' or 'localStorage').
 * @property {typeof Model[] | typeof LocalStorage[]} models - An array of model classes to be registered.
 * @property {boolean} [restore] - Whether to restore values from localStorage for LocalStorage Models.
 * @property {string[]} [ignoreFieldsStartWidth] - An array of field names to ignore.
 */
interface register {
  databaseName: string,
  version: number,
  type: 'indexedDB' | 'localStorage'
  models: typeof Model[] | typeof LocalStorage[],
  /**
   * @description restore values from localStorage for LocalStorage Models
   */
  restore?: boolean,
  ignoreFieldsStartWidth?: string[]
}

const models = {}
export const objModels = {}
const modelsLocalStorage = {}


/**
 * @function migrate
 * @description Migrates models based on the registration type (indexedDB or localStorage).
 * @param {register} register - The registration configuration.
 */
export function migrate(register: register) {
  if(register.type == 'indexedDB') {
    registerModel.register(register)
  } else if (register.type == 'localStorage') {
    registerLocalStorage.register(register)
  }
}

/**
 * @class registerModel
 * @description Manages the registration of models for indexedDB storage.
 */
export class registerModel {


  static ModalName() {}

  static register(entries: register) {

    const databaseSchema : DatabaseSchema  = {
      databaseName: entries.databaseName || uniqueGenerator(),
      version: entries.version,
      type: entries.type,
      stores: []
    };

    const storeNames = []


    let index = 0;
    for (const modelClassRepresentations of entries.models) {

      let ModelName = modelClassRepresentations.getModelName()
      if(storeNames.includes(ModelName)) {
        ModelName = uniqueGenerator()
      }

      models[ModelName] = modelClassRepresentations as typeof Model

      const {fields, attributes , fieldTypes} = ModelReader.read(modelClassRepresentations)

      const idFieldName = attributes?.primaryKey?.shift()

      databaseSchema.stores.push({
        databaseName: databaseSchema.databaseName,
        name: ModelName,
        id: {
          keyPath: idFieldName || 'id', //by default primary key is id
          autoIncrement:   fields[idFieldName]? fields[idFieldName]?.primaryKey == true: true,
          type: FieldType.INT
        },
        attributes: attributes,
        fields: [],
        fieldTypes
      })



      for(const [fieldName, Field] of  Object.entries(fields)) {
        // dont register fields that is primary key and auto increment
        if(!(Field?.primaryKey && Field?.autoIncrement  ) && !fieldTypes['ManyToManyField']?.includes(fieldName) && !fieldTypes['Unknown']?.includes(fieldName) ) {

          const removeReferenceField  = {... Field}
          if(removeReferenceField?.model) {
            removeReferenceField.model =  removeReferenceField.model.getTableSchema().name
          }


          databaseSchema.stores[index].fields.push({
            name: fieldName,
            keyPath: fieldName,
            options: {
              unique: Field?.unique || false,
              type:  Field.type
            },
            className: Field?.fieldName,
            fieldAttributes:  Object.assign({}, removeReferenceField)
          })

        }

        if(Field instanceof OneToOneField) {
          ModelEditor.addMethodOneToOneField(Field, fieldName, ModelName, databaseSchema)
        } else if (Field instanceof ForeignKey) {
          ModelEditor.addMethodForeignKey(Field, fieldName, ModelName, databaseSchema)
        } else if (Field instanceof ManyToManyField) {
          ModelEditor.addMethodManyToManyField(Field, fieldName, ModelName, databaseSchema)
        }
      }

      models[ModelName] = modelClassRepresentations as  typeof Model

      const tableSchema = databaseSchema.stores.find((e)=> e.name == ModelName)

      index++;
    }

    DatabaseManagerSchema.prepare(databaseSchema)


    for (const stores of databaseSchema.stores) {
      const model = models[stores.name] as typeof Model
      const DbName = databaseSchema.databaseName

      ModelEditor.setTableSchema(model, DbName)
      ModelEditor.getDBSchema(model, DbName)

      // ModelEditor.setModel(model, DbName)
      DatabaseManagerSchema.getDb(DbName).getTable(stores.name).setModel(model)
      transactionOnCommit.prepare(model)

      objModels[DbName+stores.name] = model
    }

    let requestMigrations: Promise<any>

    if(databaseSchema.type == 'indexedDB') {
      requestMigrations = ModelAPIRequest.obj(databaseSchema).migrate()
      ModelMigrations.migrationsState(databaseSchema.databaseName, true);
    }

    return {
      wait(): Promise<any> {
        return requestMigrations
      }
    }

  }

  static manyToManyRelationShip(foreignKeyField:ManyToManyField, FieldName:string, modelName:string, databaseSchema:DatabaseSchema): Model {
    const foreignKeyFieldModel: any = foreignKeyField.model
    const currentModel: Model = models[modelName]


    const foreignKeyFieldModelName = foreignKeyFieldModel.getModelName()
    const currentModelName = models[modelName].getModelName()

    const tableName = currentModelName+foreignKeyFieldModelName

    const num = databaseSchema.stores.push({
      databaseName: databaseSchema.databaseName,
      name: tableName,
      id: { keyPath:'id', autoIncrement: true, type: FieldType.INT},
      fields: [
        {
          name: 'iD'+foreignKeyFieldModelName,
          keyPath: 'iD'+foreignKeyFieldModelName,
          options: {
            unique:  false,
            type:  FieldType.INT
          },
          className: 'IntegerField'
        },
        {
          name: 'iD'+currentModelName,
          keyPath: 'iD'+currentModelName,
          options: {
            unique:  false,
            type:  FieldType.INT
          },
          className: 'IntegerField'
        }
      ],
      attributes: {},
      fieldTypes: {
        IntegerField: ['iD'+foreignKeyFieldModelName, 'iD'+currentModelName]
      }
    })

    const id = num -1

    models[tableName] = generateGenericModel({
      DBSchema: databaseSchema,
      ModelName: tableName,
      TableSchema: databaseSchema.stores[id]
    })

    return generateGenericModel({
      DBSchema: databaseSchema,
      ModelName: tableName,
      TableSchema: databaseSchema.stores[id]
    }) as any

  }

}

async function  cachedValue(Model) {
  const emptyFields = Model.getEmptyFields()
  Model.getEmptyFields = function() {
    return emptyFields
  }

  const getModelName = Model.getModelName()
  Model.getModelName = function() {
    return getModelName
  }
}

/**
 * @class registerLocalStorage
 * @description Manages the registration of models for localStorage.
 */
export class registerLocalStorage {
  /**
   * @function register
   * @description Registers models for localStorage storage.
   * @param {register} entries - The registration configuration.
   */
  static async register(entries: register) {


    const databaseSchema : DatabaseSchemaLocalStorage = {
      databaseName: entries.databaseName,
      version: entries.version,
      type: 'localStorage',
      stores: []
    };


    let index = 0;

    for (const modelClassRepresentations of entries.models) {
      const ModelName = this.ModelName(modelClassRepresentations as typeof LocalStorage, entries.databaseName)
      modelsLocalStorage[ModelName] = modelClassRepresentations

      const {fields, modelName, attributes , fieldTypes} = LocalStorageModelReader.read(modelClassRepresentations, entries.ignoreFieldsStartWidth || [])

      databaseSchema.stores.push({
        name: ModelName,
        id: {
          keyPath: ModelName, //by default primary key is id
          type: FieldType.VARCHAR,
          autoIncrement: false
        },
        attributes: attributes,
        fields: [],
        fieldTypes
      })

      for(const [fieldName, Field] of  Object.entries(fields)) {
        databaseSchema.stores[index].fields.push({
          name: fieldName,
          keyPath: fieldName,
          options: {
            unique: false,
            type:  null
          },
          className: Field?.fieldName,
          fieldAttributes:  Object.assign({}, Field)
        })
      }

      index++;
    }

    for (const stores of databaseSchema.stores) {
      const model = modelsLocalStorage[stores.name] as typeof LocalStorage

      ModelEditor.setTableSchemaLocalStorage(model, stores)
      ModelEditor.getDBSchemaLocalStorage(model, databaseSchema)
    }

  }


  static edit(ModelName: any, databaseSchema: any, modelClassRepresentations: any, entries: any) {
      const tableSchema = databaseSchema.stores.find((e)=> e.name == ModelName)

      modelClassRepresentations.getDBSchema = (): any => {
        return databaseSchema
      }

      modelClassRepresentations.getTableSchema = (): any => {
        return tableSchema
      }

      modelClassRepresentations.getModelName = (): any => {
        return ModelName
      }


      modelsLocalStorage[ModelName] = modelClassRepresentations

      if(entries?.restore) {
        modelClassRepresentations.get(null)
      }
  }

  static ModelName(modelClassRepresentations: typeof LocalStorage, DbName): string {
    const ModelName = DbName +'/'+ modelClassRepresentations.getModelName()

    if(modelsLocalStorage[ModelName]) {
      return hashCode(DbName +'/'+modelClassRepresentations.toString()).toString()
    }

    return ModelName
  }
}

export class ModelEditor {

  static setTableSchemaLocalStorage(ModelToEdit: typeof LocalStorage, TableSchema: TableSchemaLocalStorage) {
    ModelToEdit.getTableSchema = () => {
      return TableSchema
    }
  }

  static getDBSchemaLocalStorage(ModelToEdit: typeof LocalStorage, DatabaseSchema: DatabaseSchemaLocalStorage) {

    ModelToEdit.getDBSchema = () => {
      return DatabaseSchema
    }
  }

  static setTableSchema(ModelToEdit: typeof Model, DbName) {

    const ModelName = ModelToEdit.getModelName()
    const DBSchema = DatabaseManagerSchema.getDb(DbName)
    const TableSchemaClass = DBSchema.getTable(ModelName)

    ModelToEdit.prototype.getTableSchema = () => {
      return TableSchemaClass.config
    }
    ModelToEdit.getTableSchema = () => {
      return TableSchemaClass.config
    }
  }

  static getDBSchema(ModelToEdit: typeof Model, DbName) {

    const ModelName = ModelToEdit.getModelName()
    const DBSchema = DatabaseManagerSchema.getDb(DbName)

    ModelToEdit.prototype.getDBSchema = () => {
      return DBSchema.config
    }
    ModelToEdit.getDBSchema = () => {
      return DBSchema.config
    }
  }

  // static setModel(ModelToEdit: typeof Model, DbName) {

  //   const ModelName = ModelToEdit.getModelName()
  //   const DBSchema = DatabaseManagerSchema.getDb(DbName)
  //   const TableSchemaClass = DBSchema.getTable(ModelName)

  //   console.log('set model '+ ModelName)

  //   ModelToEdit.prototype.getModel = () => {
  //     const model = TableSchemaClass.getModel()

  //     if(!model) {
  //       console.log('model!!!!!!!!!!!!!', model, ModelName)
  //     }

  //     return new model()
  //   }
  //   ModelToEdit.getModel = () => {

  //     const model = TableSchemaClass.getModel()

  //     if(!model) {
  //       console.log('model!!!!!!!!!!!!!', model, ModelName)
  //     }
  //     return new model()
  //   }

  // }

  static addMethodOneToOneField(foreignKeyField:OneToOneField, FieldName:string, modelName:string, databaseSchema:DatabaseSchema) {

    const foreignKeyFieldModel: Model = foreignKeyField.model
    const currentModel: Model = models[modelName]

    // restaurant
    let object = undefined
    Object.defineProperty(currentModel['prototype'], foreignKeyFieldModel['name'], {
      get() {
        return {
          get: async () => {
            const foreignModel: Model = currentModel
            const obj = {}
            obj[FieldName] = this.getPrimaryKeyValue()
            const result = await foreignModel.get(obj)
            object = result
            return result
          },
          get object() {
            return object
          }
        }
      }
    })

    // place
    let object1 = undefined
    Object.defineProperty(foreignKeyFieldModel['prototype'], modelName, {
      get() {
        return {
          get: async () => {
            const foreignModel: Model = currentModel
            let params = {}
            const TableSchema = foreignModel.getTableSchema()

            console.log(FieldName, "this", this)
            params[TableSchema.id.keyPath] = this[TableSchema.id.keyPath]

            console.log({params})
            const result = await foreignModel.get(params)
            object1 = result
            return result
          },
          get object() {
            return object1
          }
        }
      }
    })
  }

  static addMethodForeignKey(foreignKeyField:ForeignKey, FieldName:string, modelName:string, databaseSchema:DatabaseSchema) {

    const foreignKeyFieldModel: Model = foreignKeyField.model
    const currentModel: Model = models[modelName]
    const FunctionName = uncapitalize(modelName)

    foreignKeyFieldModel['prototype'][FunctionName+'_setAll'] = async function () {

      const obj = {}
      obj[FieldName] = this.getPrimaryKeyValue()

      const currentModel: Model = models[modelName]

      return await currentModel.filter(obj).execute()

    }

    foreignKeyFieldModel['prototype'][FunctionName+'_setAdd'] = async function (arg) {
      const reporter = this
      arg[FieldName] = reporter
      return currentModel['create'](arg)
    }


    currentModel['prototype'][foreignKeyFieldModel.getModelName()] = async function () {

      const TableSchema = foreignKeyFieldModel.getTableSchema()
      const obj = {}

      obj[TableSchema.id.keyPath] = this[FieldName]
      return foreignKeyFieldModel.filter(obj).execute()
    }


  }

  static  async addMethodManyToManyField(foreignKeyField:ManyToManyField, FieldName:string, modelName:string, databaseSchema:DatabaseSchema) {


    const foreignKeyFieldModel: any = foreignKeyField.model
    FieldName = FieldName

    const currentModel: Model = models[modelName]

    const _middleTable = await registerModel.manyToManyRelationShip(foreignKeyField, FieldName, modelName, databaseSchema)

    console.log({FieldName})
    currentModel['prototype'][FieldName+'_add'] = async function (modelInstances) {

      const middleTable = DatabaseManagerSchema.getDb(databaseSchema.databaseName).getTable(_middleTable.getModelName()).getModel()

      if(modelInstances.constructor.name != 'Array') {
        modelInstances = [modelInstances]
      }

      for(const modelInstance of modelInstances) {

        if(modelInstance instanceof foreignKeyFieldModel) {
          let params = {}

          params[`iD${currentModel.getModelName()}`] = this.getPrimaryKeyValue()
          params[`iD${modelInstance.getModelName()}`] =  modelInstance.getPrimaryKeyValue()

          await middleTable['create'](params)
        } else {
          throw('Need to be instance of '+ foreignKeyFieldModel.getModelName())
        }
      }
    }

    // console.log({FieldName, currentModel}, FieldName)

    // let object3 = undefined
    // Object.defineProperty(currentModel['prototype'], FieldName.toUpperCase(), {
    //   get() {
    //     return {
    //       get() {
    //         {
    //           const middleTable = DatabaseManagerSchema.getDb(databaseSchema.databaseName).getTable(_middleTable.getModelName()).getModel()

    //           let _model = this

    //           return  {
    //             async all () {
    //               let params = {}
    //               params[`iD${_model.getModelName()}`] = _model.getPrimaryKeyValue()

    //               const middleTableResult = await middleTable['filter'](params).execute()
    //               object3 = middleTableResult

    //               foreignKeyField.model

    //               return middleTableResult
    //             }
    //           }
    //         }
    //       },
    //       get object() {
    //         return object3
    //       }
    //     }
    //   }
    // })


    currentModel['prototype'][FieldName+'_all'] = async function()  {
      const middleTable = DatabaseManagerSchema.getDb(databaseSchema.databaseName).getTable(_middleTable.getModelName()).getModel()

      let _model = this

      let params = {}
      let result = []
      params[`iD${_model.getModelName()}`] = _model.getPrimaryKeyValue()
      const middleTableResult = await middleTable['filter'](params).execute()
      let ids

      if(middleTableResult) {
        const TableSchema = foreignKeyField.model.getTableSchema()

        ids = middleTableResult.map((e)=> {
          return e[`iD${foreignKeyField.model.name}`]
        })

        let params = {}

        for( const id of ids) {
          try {
            params[TableSchema.id.keyPath] = id
            const row = await foreignKeyField.model.get(params)
            result.push(row)
          } catch(error) {
          }
        }
      }

      return result
    }



    foreignKeyField.model['prototype'][uncapitalize(modelName)+'_set_all'] = async function()  {
      let _model = this
      const middleTable = DatabaseManagerSchema.getDb(databaseSchema.databaseName).getTable(_middleTable.getModelName()).getModel()


      let params = {}
      let result = []
      params[`iD${_model.getModelName()}`] = _model.getPrimaryKeyValue()
      const middleTableResult = await middleTable['filter'](params).execute()
      let ids

      console.log({middleTableResult})
      console.log({currentModel})

      if(middleTableResult) {
        const TableSchema = currentModel.getTableSchema()

        ids = middleTableResult.map((e)=> {
          return e[`iD${modelName}`]
        })

        let params = {}

        for( const id of ids) {
          try {
            params[TableSchema.id.keyPath] = id
            const row = await currentModel.get(params)

            console.log(row)

            result.push(row)
          } catch(error) {
          }
        }
      }

      return result
    }
  }
}


function generateGenericModel ({DBSchema, ModelName, TableSchema}) {

  class GenericModel extends  Model {}



  for (const [Field, value] of Object.entries(Model)) {
    GenericModel[Field] = value
  }

  // GenericModel.prototype = Model.prototype

  GenericModel.prototype['getDBSchema'] = () => {
    return DBSchema
  }

  GenericModel.prototype['getModelName'] = () => {
    return ModelName
  }

  GenericModel.prototype['getTableSchema'] = () => {
    return TableSchema
  }

  // GenericModel.prototype.getModel = (): any => {
  //   return new GenericModel()
  // }

  // GenericModel.getModel = (): any => {
  //   return new GenericModel()
  // }



  GenericModel['getDBSchema'] = () => {
    return DBSchema
  }

  GenericModel['getModelName'] = () => {
    return ModelName
  }

  GenericModel['getTableSchema'] = () => {
    return TableSchema
  }

  return GenericModel
}
