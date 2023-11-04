import { IModel } from "./Api.type.js";
import { QueryBuilder } from "./queryBuilder/queryBuilder.js" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js" // Represents a return object for query-related methods
import { ORM } from "../BusinessLayer/beastOrm.js"
import { ITableSchema } from "../BusinessLayer/_interface/interface.js";
import { RuntimeMethods as RM } from "../BusinessLayer/modelManager/runtimeMethods/runTimeMethods.js";
/**
 * Represents a model for database operations.
 */
export class Model<Model>  implements IModel<Model>{
  static getTableSchema: () => ITableSchema;

  /**
   * Retrieve data from the database with specified filter parameters.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  async save(...args) {

    const queryBuilder = new QueryBuilder({isParamsArray:false});
    queryBuilder.insertInto(this[RM.getModel]()).insert(args)
  }

  static async get() {

    const queryBuilder = new QueryBuilder({isParamsArray:false});
    queryBuilder
      .select(this)
      .where(this)
      .limit(1)

    return {} as any
  }

  static async all() {

    const queryBuilder = new QueryBuilder({isParamsArray: false});
    queryBuilder.select(this)

    return {} as any
  }


  static getOrCreate(...params) {
    const isParamsArray = Array.isArray(params)? true : false
    const queryBuilder = new QueryBuilder({isParamsArray});
    const object: any = queryBuilder.select(this)
      .where(params)
      .limit(1)

    if(object) {
      return object
    }

    return new QueryBuilder({isParamsArray}).insert(params)
  }
  static async create<T>(params) {

    const isParamsArray = Array.isArray(params)? true : false

    const queryBuilder = new QueryBuilder({isParamsArray});

    queryBuilder.insertInto(this).insert(params)  as any

    return await ORM.executeInsertionQuery<T>(queryBuilder, this as any)
  }

  async delete() {
    const isParamsArray = false
    const queryBuilder = new QueryBuilder({isParamsArray});
    const model: typeof Model<any> = this[RM.getModel]()
    const tableSchema: ITableSchema = Model[RM.getTableSchema]()

    const filter = {}
    const idFieldName = tableSchema.id.keyPath

    filter[idFieldName] = this[idFieldName]
    queryBuilder.deleteFrom(model).where(filter).limit(1);

    return await ORM.deleteQueryNoFormValidation(queryBuilder, model)
  }

  static async updateOrCreate(...args) {
    this.getOrCreate(args)
    return {} as any
  }


  async update() {}

  static filter() {

    // return returnSelf.object()
  }
}


class peter extends Model<peter> {


  nice() {

  }

  static cars() {}

}

(async () => {
  const { value } = await peter.create<peter>({})

  value.delete()
})


