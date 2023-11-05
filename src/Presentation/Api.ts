import { IModel } from "./Api.type.js";
import { QueryBuilder } from "./queryBuilder/queryBuilder.js" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js" // Represents a return object for query-related methods
import { ORM } from "../BusinessLayer/beastOrm.js"
import { ITableSchema } from "../BusinessLayer/_interface/interface.js";
import { dataParameters } from "../BusinessLayer/modelManager/dataParameters.js";
/**
 * Represents a model for database operations.
 */
export class Model<Model>  implements IModel<Model>{

  static getTableSchema(): ITableSchema {
    return {} as ITableSchema
  }

  static getModel(): typeof Model {
    return { cars:'d'} as any
  }

  getModel(): typeof Model {
    return {cars:'d'} as any
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

  static async all() {
    const model = this.getModel()
    const queryBuilder = new QueryBuilder({isParamsArray: false});
    queryBuilder.select(model)

    const result = await ORM.executeSelectQuery(queryBuilder, this as any)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value
    }
  }

  static async deleteAll() {
    const queryBuilder = new QueryBuilder({isParamsArray: false});
    const model = this.getModel()

    queryBuilder.deleteFrom(model).where({}).limit(1)

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

    queryBuilder.insertInto(model).insert(params)  as any

    const result = await ORM.executeInsertionQuery<T>(queryBuilder, this as any)

    if(result.isError) {
      throw(result.error)
    } else {
      return result.value
    }
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
      return result.value
    }
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

}
