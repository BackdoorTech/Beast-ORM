import { IModel, IModelStatic, self } from "./Api.type.js";
import { QueryBuilder } from "./queryBuilder/queryBuilder.js" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js" // Represents a return object for query-related methods
import { ORM } from "../BusinessLayer/beastOrm.js"
import { ITableSchema } from "../BusinessLayer/_interface/interface.type.js";
import { dataParameters } from "../BusinessLayer/modelManager/dataParameters.js";

/**
 * Represents a model for database operations.
 */
export class Model<Model> implements IModel<Model>{

  static getTableSchema(): ITableSchema {
    throw("Register your Model before using the API") as any
  }

  static getModel(): typeof Model {
    throw("Register your Model before using the API") as any
  }

  getModel(): typeof Model {
    throw("Register your Model before using the API") as any
  }

  static getModelSchema(): any {
    throw("Register your Model before using the API") as any
  }

  async get() {
    const queryBuilder = new QueryBuilder({isParamsArray:false});
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const filter = {}
    const idFieldName = tableSchema.id.keyPath
    filter[idFieldName] = this[idFieldName]

    queryBuilder
      .select(model)
      .where(filter)
      .limit(1)
      .hasIndex(true)

    // console.log({queryBuilder})
    const result = await ORM.executeSelectQuery(queryBuilder, this as any)

    if(result.isError) {
      throw(result.error)
    } else {
      Object.assign(this, result.value)
      return true
    }
  }

  static async get(value:Object) {
    const queryBuilder = new QueryBuilder({isParamsArray:false});
    const model = this.getModel()

    queryBuilder
      .select(model)
      .where(value)
      .limit(1)
      .hasIndex(true)

    const result = await ORM.executeSelectQuery(queryBuilder, this as any)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value
    }
  }

  static async all<T>() {
    const model = this.getModel()
    const queryBuilder = new QueryBuilder({isParamsArray: true});
    queryBuilder.select(model)

    const result = await ORM.executeSelectQuery(queryBuilder, this as any)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value as T[]
    }
  }

  static async deleteAll() {
    const queryBuilder = new QueryBuilder({isParamsArray: true});
    const model = this.getModel()

    queryBuilder.deleteFrom(model)

    const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value
    }
  }

  static async create<T>(params) {

    const isParamsArray = Array.isArray(params)? true : false

    const model = this.getModel()
    const queryBuilder = new QueryBuilder({isParamsArray});

    // console.log({params})
    queryBuilder.insertInto(model).insert(params)  as any

    const result = await ORM.executeInsertionQuery<T>(queryBuilder, this as any)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value
    }
  }

  static filter<T>(value:Object) {
    const queryBuilder = new QueryBuilder({isParamsArray:true});
    const model = this.getModel()

    queryBuilder.where(value)

    return returnSelf.object<T>(queryBuilder, model)
  }


  async save(params: any = false) {
    const queryBuilder = new QueryBuilder({isParamsArray:false});
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    if(params) {
      const tableSchema = model.getTableSchema()
      const data = dataParameters.getFilteredData(tableSchema, params)
      Object.assign(this, data)
    }

    const filter = {}
    const idFieldName = tableSchema.id.keyPath
    filter[idFieldName] = this[idFieldName]

    queryBuilder.update(model).set(this).where(filter).limit(1).hasIndex(true)

    const result = await ORM.executeUpdateQuery(queryBuilder, model as any)

    if(result.isError) {
      throw(result.error)
    } else {
      return true
    }
  }

  getPrimaryKeyValue(): number | string {
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const idFieldName = tableSchema.id.keyPath

    return this[idFieldName]
  }

  setPrimaryKey(key: number | string) {
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const primaryKeyFieldName = tableSchema.id.keyPath

    this[primaryKeyFieldName] = key
  }

  // delete one
  async delete() {

    const queryBuilder = new QueryBuilder({isParamsArray: false});
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const filter = {}
    const idFieldName = tableSchema.id.keyPath

    filter[idFieldName] = this[idFieldName]
    queryBuilder.deleteFrom(model).where(filter).limit(1).hasIndex(true)

    const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value
    }
  }

  static magic() {
    return new this()
  }

  static transactionOnCommit( fn: Function ) {
    return ORM.registerTrigger(this, fn)
  }
}

export const  $B = <T>(model:  self<T>): IModelStatic<T> => {
  const _model: typeof  Model<any> = model as any
  return {
    create: (args) =>  _model.create<T>(args),
    all: () =>  _model.all<T>()
  }
}
