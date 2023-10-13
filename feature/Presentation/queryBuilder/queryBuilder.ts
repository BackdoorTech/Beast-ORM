import { Model } from '../Api'
/**
 * Represents a query builder for creating Query instances.
 * This query builder service allows you to create INSERT, UPDATE, and DELETE queries
 */
export class QueryBuilder {
  /**
   * Create a new QueryBuilder instance.
   */
  query = {
    type: '',
    table: {},
    values: [],
    updateValues: {},
    where: [],
  }

  constructor() {}

  /**
   * Start building an INSERT query.
   * @param {string} table - The name of the table to insert data into.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  insertInto(table:Model) {
    this.query.type = 'INSERT';
    this.query.table = table;
    return this;
  }

  /**
   * Start building an INSERT query.
   * @param {string} table - The name of the table to insert data into.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  select(table:Model) {
    this.query.type = 'SELECT';
    this.query.table = table;
    return this;
  }

  /**
   * Start building an UPDATE query.
   * @param {string} table - The name of the table to update data in.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  update(table:Model) {
    this.query.type = 'UPDATE';
    this.query.table = table;
    return this;
  }

  /**
   * Start building a DELETE query.
   * @param {string} table - The name of the table to delete data from.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  deleteFrom(table:Model) {
    this.query.type = 'DELETE';
    this.query.table = table;
    return this;
  }

  /**
   * Insert data into the specified table.
   * @param {Array} values - An array of objects to insert into the table.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  insert(values) {
    if (this.query.type === 'INSERT') {
      this.query.values = this.query.values.concat(values);
    }
    return this;
  }

  /**
   * Set values for an UPDATE query.
   * @param {Object} values - An object representing key-value pairs to update in the table.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  set(values) {
    if (this.query.type === 'UPDATE') {
      this.query.updateValues = { ...this.query.updateValues, ...values };
    }
    return this;
  }

  /**
   * Add a WHERE condition to the query.
   * @param {string} condition - The WHERE condition to add to the query.
   * @returns {QueryBuilder} The QueryBuilder instance.
   */
  where(condition: Object) {
    this.query.where.push(condition);
    return this;
  }

  limit(num: number) {}

  /**
   * Build and return the SQL query string.
   * @returns {string} The SQL query string.
   */
  // build() {
  //   let query = '';
  //   switch (this.query.type) {
  //     case 'INSERT':
  //       if (this.query.values.length > 0) {
  //         const columns = Object.keys(this.query.values[0]);
  //         const valueSets = this.query.values.map(obj => `(${columns.map(col => `'${obj[col]}'`).join(', ')})`);
  //         query = `INSERT INTO ${this.query.table} (${columns.join(', ')}) VALUES ${valueSets.join(', ')}`;
  //       }
  //       break;
  //     case 'UPDATE':
  //       query = `UPDATE ${this.query.table} SET ${Object.entries(this.query.updateValues).map(([key, value]) => `${key} = '${value}'`).join(', ')}`;
  //       if (this.query.where.length > 0) {
  //         query += ` WHERE ${this.query.where.join(' AND ')}`;
  //       }
  //       break;
  //     case 'DELETE':
  //       query = `DELETE FROM ${this.query.table}`;
  //       if (this.query.where.length > 0) {
  //         query += ` WHERE ${this.query.where.join(' AND ')}`;
  //       }
  //       break;
  //     default:
  //       throw new Error('Invalid query type');
  //   }
  //   return query;
  // }
}

