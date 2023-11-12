import { IDeleteQuery, ISelectQuery, IUpdateQuery } from '../../BusinessLayer/_interface/Apresentation/queryBuilder.js';
import { Model } from '../Api.js';

interface IQuery {
  model: typeof Model
  /**
   * Add a WHERE condition to the query.
   * @param {string} condition - The WHERE condition to add to the query.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  where(condition: Object): this
  limit(num: number): this
  hasIndex(boolean: Boolean): this
}


// Define a strategy interface
export interface IInsertQueryStrategy extends IQuery {
  query: ISelectQuery
  /**
   * Insert data into the specified table.
   * @param {Array} values - An array of objects to insert into the table.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  insertInto(table: typeof Model): this
}

export interface IUpdateQueryStrategy  extends IQuery {
  query: IUpdateQuery

  /**
   * Insert data into the specified table.
   * @param {Array} values - An array of objects to insert into the table.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  updateInto(table: typeof Model): this
}

export interface IDeleteQueryStrategy  extends IQuery {
  query: IDeleteQuery

  /**
   * Insert data into the specified table.
   * @param {Array} values - An array of objects to insert into the table.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  deleteFrom(table: typeof Model): this
}

export interface ISelectQueryStrategy  extends IQuery {
  query: ISelectQuery

  /**
   * Insert data into the specified table.
   * @param {Array} values - An array of objects to insert into the table.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  selectInto(table: typeof Model): this
}
