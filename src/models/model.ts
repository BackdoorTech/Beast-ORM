import { hashCode, uniqueGenerator } from '../utils.js'
import { Methods, getParams, Method } from './model.interface.js'
import { DatabaseSchema, DatabaseSchemaLocalStorage, TableSchema  } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
import { models, modelsConfig, modelsConfigLocalStorage } from './register-model.js'
import { FieldType } from '../sql/query/interface.js';
import  * as Fields from './field/allFields.js'
import { IndexedDBWorkerQueue } from '../connection/worker.queue.js';
import { transactionOnCommit } from '../triggers/transaction.js';

let methods : Methods = {} = {}


// inspire by https://github.com/brianschardt/browser-orm
export class Model extends ModelManager{


  constructor(obg?) {
    super()
    Object.assign(this, obg)
  }

  get(arg) {
    return Model.get(arg)
  }

  getDBSchema(): DatabaseSchema  {
    const modelName = this.constructor.name
    return modelsConfig[modelName].DatabaseSchema
  }

  getModelName() {
    return this.constructor.name
  }
  
  filter(...arg) {
    return Model.filter(arg)
  }

  getTableSchema(): TableSchema {
    const modelName = this.constructor.name
    return modelsConfig[modelName].TableSchema
  }

  getPrimaryKeyValue() {
    const TableSchema = this.getTableSchema()
    const idFieldName = TableSchema.id.keyPath
    return this[idFieldName]
  }

  async save() {
    const DBconfig = this.getDBSchema()
    const tableSchema = this.getTableSchema()

    const fiendsName = tableSchema.fields.map((field)=> field.name)
    fiendsName.push(tableSchema.id.keyPath)

    const Fields = {}
    for(let name of fiendsName) {
      Fields[name] = this[name]
    }

    const methods:  Method[]  = [{methodName: 'save', arguments: Fields}]
    const queryId=uniqueGenerator()

    await Model.obj(DBconfig, tableSchema).save(methods, queryId)
    IndexedDBWorkerQueue.finish(queryId)
  }


  async delete() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()

    const idFieldName = TableSchema.id.keyPath

    const createArg = {}
    createArg[idFieldName] = this[idFieldName]

    const _methods: Method[] = [{methodName: 'delete', arguments: createArg}]

    const queryId=uniqueGenerator()

    await Model.obj(DBconfig, TableSchema).delete(_methods, queryId)
    IndexedDBWorkerQueue.finish(queryId)
  }
  
  static async  deleteAll() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()

    const idFieldName = TableSchema.id.keyPath

    const createArg = {}
    createArg[idFieldName] = this[idFieldName]

    const _methods: Method[] = [{methodName: 'delete', arguments: '*'}]

    const queryId=uniqueGenerator()

    await Model.obj(DBconfig, TableSchema).delete(_methods, queryId)
    IndexedDBWorkerQueue.finish(queryId)
  }

  async all() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    const queryId=uniqueGenerator()

    const result = await Model.object({queryId, DBconfig, TableSchema}).all()
    IndexedDBWorkerQueue.finish(queryId)
    return result
  }

  getFields(arg) {
    return Model.getFields(arg)
  }


  formValidation(data) {
    return Model.formValidation(data)
  }


  Value(args) {
    return Model.Value(args)
  }

  static Value(args) {
    return ''
  }
  
  static formValidation(data) {
    const TableSchema = this.getTableSchema()

    for(let field of TableSchema.fields) {

      const Field = new Fields[field.className](field.fieldAttributes)
      const FieldValue = data[field.name]

      if(!Field.valid(FieldValue)) {
        throw('invalid insert into '+TableSchema.name +', invalid value for field '+ field.name+ ' = '+JSON.stringify(FieldValue))
      }
    }

    return true
  }

  static async getModelsFields(arg) {
    
    const newArgs = {}

    const TableSchema = this.getTableSchema()

    if(TableSchema.id?.autoIncrement) {
      TableSchema.fields.push({
        keyPath: TableSchema.id.keyPath,
        name: TableSchema.id.keyPath,
        options: {
          type: FieldType.INT,
          unique: true
        }
      })
    }

    for (const fieldName in TableSchema.fields) {
      newArgs[fieldName] = arg[fieldName]
    }

  }

  static async all() {
    // console.log('trigger get')
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    const queryId = uniqueGenerator()

    const result = await Model.object({queryId, DBconfig, TableSchema}).all()
    IndexedDBWorkerQueue.finish(queryId)
    return result
  }
  
  static async get(arg: getParams) {
    const _methods:  Method[] = [{methodName: 'get', arguments: arg}]
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    
    const queryId = uniqueGenerator()

    const foundObj = await super.obj(DBconfig, TableSchema).get(_methods, queryId)
    IndexedDBWorkerQueue.finish(queryId)

    if(!foundObj) {
      return false
    }

    const ModelName = this.getModelName()
    
    let newInstance = new models[ModelName]()
    Object.assign(newInstance, {...foundObj})

    
    if(TableSchema.fieldTypes['ManyToManyField']) {
      for( const fieldName of TableSchema.fieldTypes['ManyToManyField']) {
        delete newInstance[fieldName]
      }
    }
    
    Object.defineProperty(newInstance, TableSchema.id.keyPath, 
      { 
        configurable: false, 
        writable: false 
      }
    );

    delete newInstance.obj
    return  newInstance
  }
  

  private static getId() {
    return hashCode(this.toString())
  }

  static getModelName () {
    return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
  }

  static filter(...arg) {
    const queryId =  uniqueGenerator()
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()

    const newInstanceModel = this.NewModelInstance()

    const result = Object.assign(newInstanceModel, this.object({queryId,DBconfig, TableSchema, some:['filter', arg]})) as any
    IndexedDBWorkerQueue.finish(queryId)
    return result
  }


  static NewModelInstance() {
    class newInstanceModel {
    }
    Object.assign(newInstanceModel, this);
    return newInstanceModel as any
  }

  static getDBSchema(): DatabaseSchema  {

    const modalName = this.getModelName()
    return modelsConfig[modalName].DatabaseSchema 
  }

  static getTableSchema(): TableSchema {

    const modalName = this.getModelName()
    return modelsConfig[modalName].TableSchema;
  }


  private static async getEmptyFields () {
    const TableSchema = this.getTableSchema()
    const emptyFields = {}

    const fieldsName = TableSchema.fields.map((field)=>field.name)

    for(let fieldName of fieldsName) {
      emptyFields[fieldName] = null
    }

    return emptyFields
  }

  private static getFields(arg) {

    const TableSchema = this.getTableSchema()
    const filteredArgs = {}

    const fieldsName = TableSchema.fields.map((field)=>field.name)

    for(let fieldName of fieldsName) {
      if(arg.hasOwnProperty(fieldName)) {
        filteredArgs[fieldName] = arg[fieldName]
      }
    }

    return filteredArgs
  }


  static async create(arg): Promise<any> {

    if (arg.constructor.name != 'Array') {
      arg = [arg]
    }

    const emptyFields = await this.getEmptyFields()
    const TableSchema = this.getTableSchema()
    const ModelName = TableSchema.name


    for(let i in arg) {
      arg[i] = Object.assign({...emptyFields} , this.getFields(arg[i]))

      if(!this.formValidation(arg[i])) {
        throw('invalid '+ JSON.stringify(arg[i]))
      }

    }

    for(let i in arg) {

      if (TableSchema.attributes.foreignKey) {
        for (let field of TableSchema.attributes.foreignKey) {
          try {
            arg[i][field] = arg[i][field].getPrimaryKeyValue()
          } catch (error){}
          
        }
      }

    }
    
    
    const _methods: Method[] = [{methodName: 'create', arguments: arg}]
    const DBconfig = this.getDBSchema()

    const queryId = uniqueGenerator()
    
    const createObjectRequest = super.obj(DBconfig, TableSchema).create(_methods, queryId)
    

    for(let i in arg) {
      let newInstance = new models[ModelName]();
      Object.assign(newInstance, arg[i]);
      delete newInstance.obj;
      delete newInstance[TableSchema.id.keyPath]

      if(TableSchema.fieldTypes.ManyToManyField) {
        for (let field of TableSchema.fieldTypes.ManyToManyField) {
          // console.log(ModelName, field)
          newInstance[field] = null
          
        }
      }

      if(TableSchema.fieldTypes.OneToOneField) {
        for (let field of TableSchema.fieldTypes.ManyToManyField) {
          // console.log(ModelName, field)
          newInstance[field] = null 
        }
      }


      arg[i] = newInstance
    }

    const createObject  = await createObjectRequest
    IndexedDBWorkerQueue.finish(queryId)

    if(createObject) {

      if(typeof createObject[TableSchema.id.keyPath] == 'object') {
        throw(createObject[TableSchema.id.keyPath].error)
      } else {
        if(Array.isArray(createObject)) {
          
          for(let a in createObject) {
            arg[a][TableSchema.id.keyPath] = createObject[a][TableSchema.id.keyPath] 
          }

          return arg
        } else {

          arg[0][TableSchema.id.keyPath] = createObject[TableSchema.id.keyPath]
          return arg[0]
        }
      }
    }

  }

  private static newInstance({ TableSchema, DBconfig, ModelName, dataToMerge }) {
    let newInstance = new models[ModelName]();
    Object.assign(newInstance, dataToMerge);
    delete newInstance.obj;
    return newInstance;
  }


  static async createOrFind(getArg, defaultCreate) {
    
    const result: any[] = await this.filter(getArg).execute()
    const TableSchema = this.getTableSchema()
    const DBconfig = this.getDBSchema()
    const ModelName = this.getModelName();

    let instance;
    let created;
    
    if(result.length == 1) {
      created = false
      instance =  await this.newInstance({ TableSchema, DBconfig, ModelName, dataToMerge: result[0] })
    } else {
      created = true
      instance = await this.create(Object.assign(getArg, defaultCreate))
    }

    return [instance, created]
  }

  static async updateOrCreate(argToFind, argsToUpdate) {
    
    let [instance , created] = await this.createOrFind(argToFind, argsToUpdate)

    if(!created) {
      const params = Object.assign(argToFind, argsToUpdate)
      instance = Object.assign(instance, params)

      await instance.save()
    }
    return instance

  }


  static async update(arg) {
    
    arg = this.getFields(arg)

    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    const _methods: Method[] = [{methodName: 'update', arguments: arg}]
    const queryId = uniqueGenerator()
    

    const result = await super.obj(DBconfig, TableSchema).update(_methods, queryId)
    IndexedDBWorkerQueue.finish(queryId)
    return result
  }


  static transactionOnCommit (callback : () => void) {
    return transactionOnCommit.subscribe(this as unknown as Model, callback)
  }

  static object = ({queryId, DBconfig, TableSchema,  some = null}) => {


    if(!methods[queryId]) {
      methods[queryId] = []
    }

    if(some) {
      const methodName = some[0]
      const methodArgs = some[1]
      this.object({queryId,DBconfig, TableSchema})[methodName](...methodArgs)
    }

    return {
      filter: (...args) => {
        methods[queryId].push({methodName: 'filter', arguments: args})
        const newInstanceModel = this.NewModelInstance()
        return Object.assign(newInstanceModel, this.object({DBconfig, TableSchema,queryId}))
      },
      execute: async () => {
        methods[queryId].push({methodName: 'execute', arguments: null})

        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return  await super.obj(DBconfig, TableSchema).execute(_methods, queryId)
      }, 
      update: async(args) => {
        methods[queryId].push({methodName: 'update', arguments: args})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return  await super.obj(DBconfig, TableSchema).update(_methods, queryId)
      },
      delete: async() => {
        methods[queryId].push({methodName: 'delete', arguments: null})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return await super.obj(DBconfig, TableSchema).delete(_methods, queryId)

      },
      all: async() => {
        // console.log('model all')
        methods[queryId].push({methodName: 'all', arguments: null})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return await super.obj(DBconfig, TableSchema).all(_methods, queryId)

      }
    }
  }
}


export class LocalStorage {

  constructor() {}

  static save(data: Object = {}) {
    const dataToSave = this.getFields(Object.assign(this, {...data}))
    const key = this.getTableSchema().id
    localStorage.setItem(key.keyPath, JSON.stringify(dataToSave))
  }

  static get() {
    const key = this.getTableSchema().id
    const restedData = JSON.parse(localStorage.getItem(key.keyPath))
    Object.assign(this, {...restedData})

    return restedData
  }

  static getModelName() {
    return this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
  }

  static getDBSchema(): DatabaseSchemaLocalStorage  {
    const modalName = this.getModelName()
    return modelsConfigLocalStorage[modalName].DatabaseSchema 
  }

  static getTableSchema(): TableSchema {
    const modalName = this.getModelName()
    return modelsConfigLocalStorage[modalName].TableSchema;
  }

  private static getIgnoreAttributes(): false | [] {
    return false
  }

  static ignoreAttributes(attributesStartWidth: string[] = []) {
    if(!this.getIgnoreAttributes()) {
      this.getIgnoreAttributes = (): any => {
        return attributesStartWidth
      }
    }
  }

  private static getFields(arg) {

    const TableSchema = this.getTableSchema()
    const filteredArgs = {}

    const fieldsName = TableSchema.fields.map((field)=>field.name)
    const Attributes = this.getIgnoreAttributes()
    
    const fieldNameFilter = fieldsName.filter((fieldName) => {
      
      if(Attributes) {
        for(let Attribute of Attributes) {
          if(fieldName.startsWith(Attribute)) {
            return false
          }
        }
      }
      
      return true
    })

    for(let fieldName of fieldNameFilter) {
      if(arg.hasOwnProperty(fieldName)) {
        filteredArgs[fieldName] = arg[fieldName]
      }
    }

    return filteredArgs
  }

  private static formValidation(data) {
    const TableSchema = this.getTableSchema()

    for(let field of TableSchema.fields) {

      const Field = new Fields[field.className](field.fieldAttributes)
      const FieldValue = data[field.name]

      if(!Field.valid(FieldValue)) {
        throw('invalid insert into '+TableSchema.name +', invalid value for field '+ field.name+ ' = '+JSON.stringify(FieldValue))
      }
    }

    return true
  }

  static clear() {
    this.clearComponent()
    this.clearStorage()
  }

  static clearComponent() {
    const key = this.getTableSchema().id
  }

  static clearStorage() {
    const key = this.getTableSchema().id
    localStorage.removeItem(key.keyPath)
  }

}