import { QueryBuilder } from '../queryBuilder/queryBuilder'
import { ModelNoFields as UserModel } from '../../Utility/test/models'
/**
 * @description
 * - `QueryBuilder` is a components for constructing database queries. This includes SELECT, INSERT, UPDATE, and DELETE queries in an object-oriented way.
 * - `QueryBuilder` represents a query builder for creating Query instances.
 */

describe('QueryBuilder', () => {
  it('should create an INSERT query with an array of objects', () => {

    const userModel = new UserModel()

    const insertData = [
      { name: 'John', age: 25 },
      { name: 'Alice', age: 30 },
    ];

    const query = new QueryBuilder()
      .insertInto(userModel)
      .insert(insertData)

    expect(JSON.stringify(query)).to.equal('{"query":{"type":"INSERT","table":{},"values":[{"name":"John","age":25},{"name":"Alice","age":30}],"updateValues":{},"where":[]}}');
  });

  it('should create an UPDATE query with WHERE condition', () => {

    const userModel = new UserModel()

    const query = new QueryBuilder()
      .update(userModel)
      .set({ age: 26 })
      .where({name:'John'})

    expect(JSON.stringify(query)).to.equal( '{"query":{"type":"UPDATE","table":{},"values":[],"updateValues":{"age":26},"where":[{"name":"John"}]}}' );
  });

  it('should create a SELECT query with WHERE condition', () => {

    const userModel = new UserModel()

    const query = new QueryBuilder();
    query.select(userModel)
      .where({id: 0})
      .limit(1)

    expect(JSON.stringify(query)).to.equal('{"query":{"type":"SELECT","table":{},"values":[],"updateValues":{},"where":[{"id":0}]}}');
  });


  it('should create a DELETE query with WHERE condition', () => {

    const userModel = new UserModel()

    const query = new QueryBuilder()
      .deleteFrom(userModel)
      .where({age_lte:18})

    expect(JSON.stringify(query)).to.equal('{"query":{"type":"DELETE","table":{},"values":[],"updateValues":{},"where":[{"age_lte":18}]}}');
  });
});
