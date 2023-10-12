import { QueryBuilder } from '../queryBuilder/queryBuilder'
/**
 * @description
 * - `QueryBuilder` is a components for constructing database queries. This includes classes for creating SELECT, INSERT, UPDATE, and DELETE queries in an object-oriented way.
 * - `QueryBuilder` represents a query builder for creating Query instances.
 */
describe('QueryBuilder', () => {

  it('Create QueryBuilder', () => {

    const query = new QueryBuilder()

    expect(query).to.equal(query) // test pass
  })

})
