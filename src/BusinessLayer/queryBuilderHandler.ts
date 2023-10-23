import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../DataAccess/DriverAdapters/DriverAdapter.type.js"
class QueryBuilderHandler {
  async INSERT(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder) {

    const dataToInsert = QueryBuilder.query.values
    const result = []
    const tableName = QueryBuilder.query.table
    const idFieldName = QueryBuilder.model["getTableSchema"]().id.keyPath;

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.insert(tableName, dataToInsert)({
        onsuccess:(data) => {
          const id = data.data;
          const index = data.index
          dataToInsert[index][idFieldName] =  id
          result.push(dataToInsert[index])
        },
        done:() => {
          resolve(result)
        }
      })
    })

  }
}

export const queryBuilderHandler = new QueryBuilderHandler()
