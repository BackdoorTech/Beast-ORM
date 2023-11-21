import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, error, ok} from '../../Utility/Either/index.js'

class QueryBuilderDeleteHandler {

  async DELETEOne(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number , false>> {

    const tableName = QueryBuilder.query.table
    let deleteCount = 0

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.delete(tableName, QueryBuilder.query)({
        onsuccess:() => {
          deleteCount++
        },
        onerror:() => {
          resolve(error(false))
        },
        done:() => {
          resolve(ok(1))
        }
      })
    })

  }


  async DELETEMany(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number , number>> {

    const tableName = QueryBuilder.query.table
    let deleteCount = 0

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.deleteMany(tableName, QueryBuilder.query)({
        onsuccess:() => {
          deleteCount++
        },
        onerror:() => {},
        done:(count: number) => {
          resolve(ok(count))
        }
      })
    })

  }

}

export const queryBuilderDeleteHandler = new QueryBuilderDeleteHandler()
