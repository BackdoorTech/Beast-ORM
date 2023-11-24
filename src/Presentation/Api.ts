import { IModel } from "./Api.type.js";
import { QueryBuilder } from "./queryBuilder/queryBuilder.js" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js" // Represents a return object for query-related methods
import { ORM } from "../BusinessLayer/beastOrm.js"
import { ICallBackReactiveList, ITableSchema } from "../BusinessLayer/_interface/interface.type.js";
import { dataParameters } from "../BusinessLayer/modelManager/dataParameters.js";
import { APIError, APIOk, APIResponse } from "../Utility/Either/APIResponse.js";
import { FormValidationError } from "../BusinessLayer/validation/fields/allFields.type.js";
import { BulkDataUniqueFieldError, ItemNotFound } from "../BusinessLayer/queryBuilderHandler/queryErrorHandler.js";
import { Either } from "../Utility/Either/index.js";
import { TransactionAbortion } from "../DataAccess/_interface/interface.type.js";

/**
 * Represents a model for database operations.
 */
export class Model<Model> implements IModel<Model> {

  getModel(): typeof Model {
    throw("Register your Model before using the API") as any
  }

  async save(params): Promise<APIResponse<number, FormValidationError>> {
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

    const result = await ORM.executeUpdateQuery(queryBuilder, model)

    if(result.isError) {
      return APIError(result.error)
    } else {
      return APIOk(result.value)
    }
    
  }

  getPrimaryKeyValue(): number | string {
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const idFieldName = tableSchema.id.keyPath

    console.log(this)
    return this[idFieldName]
  }

  setPrimaryKey(key: number | string) {
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const primaryKeyFieldName = tableSchema.id.keyPath

    this[primaryKeyFieldName] = key
  }

  // delete one
  async delete(): Promise<APIResponse<number, FormValidationError>> {

    const queryBuilder = new QueryBuilder({isParamsArray: false});
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const filter = {}
    const idFieldName = tableSchema.id.keyPath

    filter[idFieldName] = this[idFieldName]
    queryBuilder.deleteFrom(model).where(filter).limit(1).hasIndex(true)

    const result =  await ORM.deleteQueryNoFormValidation(queryBuilder, model)


    if(result.isError) {
      return APIError(result.error)
    } else {
      return APIOk(result.value)
    }
  }
  async get(): Promise<APIResponse<Model, FormValidationError>> {
    const queryBuilder = new QueryBuilder({isParamsArray:false});
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    const filter = dataParameters.getUniqueData(tableSchema, this)

    console.log({filter});
    
    queryBuilder
      .select(model)
      .where(filter)
      .limit(1)
      .hasIndex(true)

    // console.log({queryBuilder})
    const result = await ORM.executeSelectQuery<Model>(queryBuilder, this).one()

    console.log(result);

    if(result.isError) {
      return APIError(result.error)
    } else {
      Object.assign(this, result.value)
      return APIOk(result.value)
    }
  }

  static getTableSchema(): ITableSchema {
    throw("Register your Model before using the API") as any
  }

  static getModel(): typeof Model<any> {
    throw("Register your Model before using the API") as any
  }

  static getModelSchema(): typeof Model<any> {
    throw("Register your Model before using the API") as any
  }

  static async get<T>(value:Object): Promise<APIResponse<T, FormValidationError | ItemNotFound>> {
    const queryBuilder = new QueryBuilder({isParamsArray:false});
    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()
    const filter = dataParameters.getUniqueData(tableSchema, value)

    queryBuilder
      .select(model)
      .where(filter)
      .limit(1)
      .hasIndex(true)

    const result = await ORM.executeSelectQuery<T>(queryBuilder, this).one()

    if(result.isError) {
      return APIError(result.error)
    } else {
      return APIOk(result.value)
    }
  }

  static async all<T>(): Promise<APIResponse<T[], FormValidationError>> {
    const model = this.getModel()
    const queryBuilder = new QueryBuilder({isParamsArray: false});
    queryBuilder.select(model)

    const result = await ORM.executeSelectQuery<T>(queryBuilder, this).many()

    if(result.isError) {
      return APIError(result.error)
    } else {
      return APIOk(result.value)
    }
  }

  static async deleteAll(): Promise<APIResponse<number, FormValidationError>> {
    const queryBuilder = new QueryBuilder({isParamsArray: true});
    const model = this.getModel()

    queryBuilder.deleteFrom(model)

    const result = await ORM.deleteQueryNoFormValidation(queryBuilder, model)

    if(result.isError) {
      return APIError(result.error)
    } else {
      return APIOk(result.value)
    }

  }

  static async create<T>(params): Promise<APIResponse<T, FormValidationError | TransactionAbortion>> {

    const isParamsArray = Array.isArray(params)? true : false

    const model = this.getModel()
    const queryBuilder = new QueryBuilder({isParamsArray});

    queryBuilder.insertInto(model).insert(params)

    const result = await ORM.executeInsertionQuery<T>(queryBuilder, this)

    if(result.isError) {
      return APIError(result.error)
    } else {
      return APIOk(result.value)
    }
  }

  static filter<T>(value:Object) {
    const queryBuilder = new QueryBuilder({isParamsArray:true});
    const model = this.getModel()

    queryBuilder.where(value)

    return returnSelf.object<T>(queryBuilder, model)
  }


  static magic() {
    return new this()
  }

  static transactionOnCommit( fn: Function ) {
    return ORM.registerTrigger(this, fn)
  }

  static ReactiveList (callback : ICallBackReactiveList) {
    return ORM.ReactiveList(this, callback)
  }

  static async getOrCreate<T>(params: any): Promise<APIResponse<number, FormValidationError | BulkDataUniqueFieldError>> {

    
    const isParamsArray = Array.isArray(params)? true : false
    const paramsA: Object[] = params?.constructor?.name != 'Array'? [params]: params
    const paramUnique:  Object[] = []

    const model = this.getModel()
    const tableSchema: ITableSchema = model.getTableSchema()

    for( const i in paramsA) {
      const ProcessedDataUniqueFieldOnly = dataParameters.getUniqueData(tableSchema, paramsA[i])

      paramUnique[i] = ProcessedDataUniqueFieldOnly
      if(!dataParameters.hasField(ProcessedDataUniqueFieldOnly)) {
        return APIError(new BulkDataUniqueFieldError({data:ProcessedDataUniqueFieldOnly, index:i, rows: paramsA, table:tableSchema.name}))
      }
    }


    const allRequestToPerform = paramsA.map( param => {
      const queryBuilderGet = new QueryBuilder({isParamsArray:false});
      queryBuilderGet
        .select(model)
        .where(param)
        .limit(1)
        .hasIndex(true)
  
      return ORM.executeSelectQuery<T>(queryBuilderGet, this).one()
    })

    const allFindRequest = await Promise.all(allRequestToPerform)



    const created:T[] = []
    const found:T[] = []
    const list :T[] = []

    const toCreate: {
      ItemNotFound: ItemNotFound,
      index: any
    }[] = []


    for (let i =0; i < allFindRequest.length; i++) {
      const findRequest : Either<T, ItemNotFound> = allFindRequest[i]

      if(findRequest.isError) {
        toCreate.push({ItemNotFound:findRequest.error, index:i})
      } else {
        found.push(findRequest.value)
      }
    }

    const queryBuilderCreate = new QueryBuilder({isParamsArray:true});
    queryBuilderCreate.insertInto(model)


    for (const { ItemNotFound, index } of toCreate) {
      const dataToInsert = paramsA[index]
      const ProcessedData = dataParameters.getFilteredData(tableSchema, dataToInsert)
      const agr = ProcessedData

      queryBuilderCreate.insert(agr)
    }


    const result = await ORM.executeInsertionQuery<T>(queryBuilderCreate, this)
  


    // if(result.isError) {
    //   return APIError(result.error)
    // } else {
    //   return APIOk(result.value)
    // }

    return 0 as any

  }

}