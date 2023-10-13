import { QueryBuilder } from "./queryBuilder/queryBuilder" // Represents a query object that helps build and execute database queries.
import { returnSelf } from "./returnSelf/returnSelf" // Represents a return object for query-related methods

/**
 * Represents a model for database operations.
 */
export class Model {

  /**
   * Save the current model's data to the database.
   * @returns A promise that resolves when the save operation is complete.
   */
  save(...args) {
    const queryBuilder = new QueryBuilder();
    queryBuilder.insertInto(this).insert(args)
  }

  /**
   * Retrieve data from the database with specified filter parameters.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
  get(params) {
    const queryBuilder = new QueryBuilder();
    queryBuilder
      .select(this)
      .where(this)
      .limit(1)
  }

  /**
   * Retrieve all data of the current model from the database.
   * @returns A promise that resolves with all query results.
   */
  all() {
    const queryBuilder = new QueryBuilder();
    queryBuilder.select(this)
  }

  /**
   * Retrieve data from the database with specified filter parameters and create if it doesn't exist.
   * @param params - The filter parameters for the query.
   * @returns A promise that resolves with the query results.
   */
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
  create(...params) {
    const queryBuilder = new QueryBuilder();

    return queryBuilder.insert(this).insert(params)
  }


  /**
   * Delete data from the database with specified filter parameters.
   * @param params - The filter parameters for the delete.
   * @returns A promise that resolves when the delete operation is complete.
   */
  async delete(params: any) {
    const queryBuilder = new QueryBuilder();
    return queryBuilder.deleteFrom(this).where(params).limit(1);
  }

  updateOrCreate(...args) {
    this.getOrCreate(args)
  }

  /**
   * Update data in the database with specified filter parameters.
   * @param params - The filter parameters for the update.
   * @returns A promise that resolves when the update operation is complete.
   */
  update() {}

  filter() {

    // return returnSelf.object()
  }
}
