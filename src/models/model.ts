import { hashCode, uniqueGenerator } from '../utils.js'
import { Methods, getParams, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
import { models, modelsConfig } from './register-model.js'
import { FieldType } from '../sql/query/interface.js';
import  * as Fields from './field/allFields.js'
import { field } from './field/field.js'

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

  private getPrimaryKeyValue() {
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
  }

  async all() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    return await Model.object({DBconfig, TableSchema}).all()
  }

  getFields(arg) {
    return Model.getFields(arg)
  }


  formValidation(data) {
    return Model.formValidation(data)
  }

  static formValidation(data) {
    const TableSchema = this.getTableSchema()

    for(let field of TableSchema.fields) {

      const Field = new Fields[field.className](field.fieldAttributes)
      const FieldValue = data[field.name]

      if(!Field.valid(FieldValue)) {
        return false
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
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    return await Model.object({DBconfig, TableSchema}).all()
  }
  
  static async get(arg: getParams) {
    const _methods:  Method[] = [{methodName: 'get', arguments: arg}]
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    
    const queryId = uniqueGenerator()

    const foundObj = await super.obj(DBconfig, TableSchema).get(_methods, queryId)

    if(!foundObj) {
      return false
    }

    const ModelName = this.getModelName()
    
    let newInstance = new models[ModelName]()
    Object.assign(newInstance, {...foundObj})
    
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

    return  Object.assign(newInstanceModel, this.object({queryId,DBconfig, TableSchema, some:['filter', arg]})) as any
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

    const queryId=uniqueGenerator()
    
    const createObject = await super.obj(DBconfig, TableSchema).create(_methods, queryId)


    if(createObject) {
      const ModelName = this.getModelName();
      let newInstance = new models[ModelName]();
      Object.assign(newInstance, createObject);
      delete newInstance.obj;
      return newInstance;
    } else {
        
    }

  }

  private static getPrimaryKeyValue() {
    const TableSchema = this.getTableSchema()
    const idFieldName = TableSchema.id.keyPath
    return this[idFieldName]
  }


  private static newInstance({ TableSchema, DBconfig, ModelName, dataToMerge }) {
    let newInstance = new models[ModelName]();
    Object.assign(newInstance, {...dataToMerge});
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

    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    const _methods: Method[] = [{methodName: 'update', arguments: arg}]
    const queryId=uniqueGenerator()

    return  await super.obj(DBconfig, TableSchema).update(_methods, queryId)
  }

  static object = ({queryId=uniqueGenerator(), DBconfig, TableSchema,  some = null}) => {


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

        methods[queryId].push({methodName: 'all', arguments: null})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return await super.obj(DBconfig, TableSchema).all(_methods, queryId)

      }
    }
  }
}