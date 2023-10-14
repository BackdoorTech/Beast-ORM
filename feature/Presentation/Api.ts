import { IModel } from "./Api.type";
import { QueryBuilder } from "./queryBuilder/queryBuilder" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf" // Represents a return object for query-related methods

/**
 * Represents a model for database operations.
 */
export class Model<Model>  implements IModel<Model>{

  static getTableSchema: () => import("c:/Users/peter.maquiran/Documents/project/beast-ORM-v0/feature/BusinessLayer/modelManager/schemaGenerator/schemaGenerator.type").TableSchema;

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
  async create(...params) {
    const queryBuilder = new QueryBuilder();

    return queryBuilder.insert(this).insert(params)  as any
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

