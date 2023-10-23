import { IModel } from "./Api.type.js";
import { QueryBuilder } from "./queryBuilder/queryBuilder.js" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf.js" // Represents a return object for query-related methods
import { ORM } from "../BusinessLayer/beastOrm.js"
import { TableSchema } from "../../_src/models/register-modal.interface.js";
/**
 * Represents a model for database operations.
 */
export class Model<Model>  implements IModel<Model>{
  static getTableSchema: () => TableSchema;

  /**
   * Retrieve data from the database with specified filter parameters.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  async save(...args) {
    const queryBuilder = new QueryBuilder();
    queryBuilder.insertInto(this).insert(args)
  }

  async get() {
    const queryBuilder = new QueryBuilder();
    queryBuilder
      .select(this)
      .where(this)
      .limit(1)

    return {} as any
  }

  async all() {
    const queryBuilder = new QueryBuilder();
    queryBuilder.select(this)

    return {} as any
  }


  getOrCreate(...params) {
    const queryBuilder = new QueryBuilder();
    const object: any = queryBuilder.select(this)
      .where(params)
      .limit(1)

    if(object) {
      return object
    }

    return new QueryBuilder().insert(params)
  }
  static async create(params) {

    const isParamsArray = Array.isArray(params)? true : false

    const queryBuilder = new QueryBuilder();

    queryBuilder.insertInto(this as any).insert(params)  as any

    const result = await ORM.executeQuery(queryBuilder, this as any)

    return isParamsArray? result: result[0]
  }

  async delete(params: any) {
    const queryBuilder = new QueryBuilder();
    return queryBuilder.deleteFrom(this).where(params).limit(1);
  }

  async updateOrCreate(...args) {
    this.getOrCreate(args)
    return {} as any
  }


  async update() {}

  filter() {

    // return returnSelf.object()
  }
}

