import { hashCode, uniqueGenerator } from '../utils.js'
import { Methods, getParams, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
import { models } from './register-model.js'
import { field } from './field/field.js';


let methods : Methods = {} = {}

let modalSpace: {[key: string]: {
  databaseSchema : DatabaseSchema 
}} = {}

const constNewInstate = {}

// inspire by https://github.com/brianschardt/browser-orm
export class Model extends ModelManager{


  constructor(obg?) {
    super()
    Object.assign(this, obg)
  }

  get(arg) {
    return Model.get(arg)
  }

  setDBConfig(config:DatabaseSchema ) {
    Model.setDBConfig(config)
  }

  getDBSchema(): DatabaseSchema  {
    const modelName = this.constructor.name
    return constNewInstate[modelName].DBconfig
  }

  getModelName() {
    const modelName = this.constructor.name
    return constNewInstate[modelName].ModelName
  }
  
  filter(...arg) {
    return Model.filter(arg)
  }

  getTableSchema(): TableSchema {
    const modelName = this.constructor.name
    console.log(this.constructor)
    return constNewInstate[modelName].TableSchema
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
    await Model.obj(DBconfig, tableSchema).save(methods)
  }


  async delete() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()

    const idFieldName = TableSchema.id.keyPath

    const createArg = {}
    createArg[idFieldName] = this[idFieldName]

    const _methods: Method[] = [{methodName: 'delete', arguments: createArg}]
    await Model.obj(DBconfig, TableSchema).delete(_methods)
  }

  async all() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    return await Model.object({DBconfig, TableSchema}).all()
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

    const foundObj = await super.obj(DBconfig, TableSchema).get(_methods)

    if(!foundObj) {
      return false
    }

    const ModelName = this.getModelName()
    constNewInstate[ModelName] = {TableSchema, DBconfig, ModelName}
    
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

    return  Object.assign(this, this.object({queryId, DBconfig, TableSchema, some:['filter', arg]}))
  }
  
  static setDBConfig(config:DatabaseSchema ) {
    const id = this.getId() 
    
    const modalName = this.getModelName()

    if(modalSpace[modalName]?.databaseSchema  == null) {  
      modalSpace[modalName] = Object.assign(modalSpace[modalName] || {}, {databaseSchema :config})
    }
  }

  static getDBSchema(): DatabaseSchema  {

    const modalName = this.getModelName()
    return modalSpace[modalName].databaseSchema 
  }

  static getTableSchema(): TableSchema {

    const modalName = this.getModelName()
    const databaseSchema = modalSpace[modalName].databaseSchema;
    const tableSchema = databaseSchema.stores.find((e)=> e.name == this.getModelName())

    return tableSchema

  }


  private static async getEmptyFields () {
    const TableSchema = this.getTableSchema()
    const emptyFields = {}

    const fieldsName = TableSchema.fields.map((field)=>field.name)

    for(let fieldName of fieldsName) {
      emptyFields[fieldName] = ''
    }

    return emptyFields
  }

  static async create(arg): Promise<any> {

    if (arg.constructor.name != 'Array') {
      arg = [arg]
    }

    const emptyFields = await this.getEmptyFields()

    for(let i in arg) {
      arg[i] = Object.assign({...emptyFields} , arg[i])
    }

    const TableSchema = this.getTableSchema()
    const _methods: Method[] = [{methodName: 'create', arguments: arg}]
    const DBconfig = this.getDBSchema()
    
    const createObject = await super.obj(DBconfig, TableSchema).create(_methods)


    if(createObject) {
      const ModelName = this.getModelName();
      constNewInstate[ModelName] = { TableSchema, DBconfig, ModelName };
      let newInstance = new models[ModelName]();
      Object.assign(newInstance, createObject);
      delete newInstance.obj;
      return newInstance;
    } else {
        
    }

  }


  private static newInstance({ TableSchema, DBconfig, ModelName, dataToMerge }) {
    constNewInstate[ModelName] = { TableSchema, DBconfig, ModelName };
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
      instance = await this.create(Object.assign(defaultCreate, getArg))
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

    return  await super.obj(DBconfig, TableSchema).update(_methods)
  }

  static object = ({queryId=uniqueGenerator(), some = null, DBconfig, TableSchema}) => {

    if(!methods[queryId]) {
      methods[queryId] = []
    }

    if(some) {
      const methodName = some[0]
      const methodArgs = some[1]
      this.object({queryId, DBconfig, TableSchema})[methodName](...methodArgs)
    }

    return {
      filter: (...args) => {
        methods[queryId].push({methodName: 'filter', arguments: args})
        return Object.assign(this, this.object({queryId, DBconfig, TableSchema}))
      },
      execute: async () => {
        methods[queryId].push({methodName: 'execute', arguments: null})

        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return  await super.obj(DBconfig, TableSchema).execute(_methods)
      }, 
      update: async(args) => {
        methods[queryId].push({methodName: 'update', arguments: args})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return  await super.obj(DBconfig, TableSchema).update(_methods)
      },
      delete: async() => {
        methods[queryId].push({methodName: 'delete', arguments: null})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return await super.obj(DBconfig, TableSchema).delete(_methods)

      },
      all: async() => {

        methods[queryId].push({methodName: 'all', arguments: null})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return await super.obj(DBconfig, TableSchema).all(_methods)

      }
    }
  }
}