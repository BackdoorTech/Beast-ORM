import { hashCode, uniqueGenerator } from '../utils.js'
import { Methods, getParams, Method } from './model.interface.js'
import { DatabaseSchema, TableSchema  } from './register-modal.interface.js';
import { ModelManager } from './model-manager.js';
import { models } from './register-model.js'


let methods : Methods = {} = {}

let modalSpace: {[key: string]: {
  databaseSchema : DatabaseSchema 
}} = {}

const constNewInstate = {}

// inspire by https://github.com/brianschardt/browser-orm
export class Model extends ModelManager{

  BeastOrmId

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
    return constNewInstate[this.BeastOrmId].DBconfig
  }

  getModelName() {
    return constNewInstate[this.BeastOrmId].ModelName
  }
  
  filter(...arg) {
    return Model.filter(arg)
  }

  getTableSchema(): TableSchema {
    return constNewInstate[this.BeastOrmId].TableSchema
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

  async create(arg) {
    return await Model.create(arg)
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
    return await Model.object({DBconfig, TableSchema,some:['all', null]})
  }
  
  static async all() {
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    return await Model.object({DBconfig, TableSchema,some:['all', null]})
  }
  
  static async get(arg: getParams) {
    const _methods:  Method[] = [{methodName: 'get', arguments: arg}]
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()

    const foundObj = await super.obj(DBconfig, TableSchema).get(_methods)

    if(!foundObj) {
      console.log('Object not found param')
    }

    const ModelName = this.getModelName()
    const BeastOrmId = uniqueGenerator()
    constNewInstate[BeastOrmId] = {TableSchema, DBconfig, ModelName}
    
    let newInstance = new models[ModelName]()
    Object.assign(newInstance, {...foundObj, BeastOrmId})
    
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

    if(modalSpace[id]?.databaseSchema  == null) {  
      modalSpace[id] = Object.assign(modalSpace[id] || {}, {databaseSchema :config})
    }
  }

  static getDBSchema(): DatabaseSchema  {

    const id = this.getId()
    return modalSpace[id].databaseSchema 
  }

  static getTableSchema(): TableSchema {

    const id = this.getId()
    const databaseSchema = modalSpace[id].databaseSchema;
    const tableSchema = databaseSchema.stores.find((e)=> e.name == this.getModelName())

    return tableSchema

  }

  static async create(arg): Promise<any> {

    if (arg.constructor.name != 'Array') {
      arg = [arg]
    }

    const _methods: Method[] = [{methodName: 'create', arguments: arg}]
    const DBconfig = this.getDBSchema()
    const TableSchema = this.getTableSchema()
    const createObject = await super.obj(DBconfig, TableSchema).create(_methods)

    if(createObject) {
      const ModelName = this.getModelName();
      const BeastOrmId = uniqueGenerator();
      constNewInstate[BeastOrmId] = { TableSchema, DBconfig, ModelName };
      let newInstance = new models[ModelName]();
      Object.assign(newInstance, createObject);
      delete newInstance.obj;
      return newInstance;
    } else {
        
    }

  }


  static async updateOrCreate(argToFind, argsToUpdate) {
    
    const keys = Object.keys(argToFind)
    let row

    if(keys.length == 1) {
      row = await this.get(argToFind)
    } else if(keys.length >= 2) {
      [row] = await this.filter(argToFind).execute()
    }
    

    if(!row) {
      return await this.create(row)
    } else {
      const newInstance = await this.get(row)
      Object.assign(newInstance, argsToUpdate)
      await newInstance.save()

      return newInstance
    }
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

      }, all: async() => {

        methods[queryId].push({methodName: 'all', arguments: null})
        const _methods: Method[] = methods[queryId]
        methods[queryId] = []
        return await super.obj(DBconfig, TableSchema).all(_methods)

      }
    }
  }
}