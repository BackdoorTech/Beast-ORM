import { Model } from "../Api";
import { Query } from './query';

/**
 * Represents a query builder for creating Query instances.
 */
export class QueryBuilder {
  /**
   * Create a new Query instance.
   * @param model - The model associated with the query.
   * @param operation - The type of query operation (e.g., select, insert, update, delete).
   * @returns A new Query instance.
   */
  private _query!: Query

  createQuery({model, operation}) {
    this._query = new Query(model, operation);
    return this._query
  }

  get query() {
    return this._query
  }
}
