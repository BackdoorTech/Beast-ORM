import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, error, ok} from '../../Utility/Either/index.js'

class QueryBuilderSelectHandler {

  async SELECTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

    const tableName = QueryBuilder.query.table
    let result = []

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.select(tableName, QueryBuilder.query)({
        onsuccess:(data:any) => {},
        onerror:() => {
          resolve(error(false))
        },
        done:(data) => {
          if(QueryBuilder.hasNoCondition) {
            resolve(ok(result as any)) // get all with no condition `Model.all()`
          } else { // get with condition `Model.get()`
            resolve(ok(data[0] as any))
          }
        }
      })
    })
  }

  async SELECTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

    const tableName = QueryBuilder.query.table
    let result = []

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.selectMany(tableName, QueryBuilder.query)({
        onsuccess:(data:any) => {
          result = data.data // get all with no condition `Model.all()`
        },
        onerror:() => {
          if(!QueryBuilder.query.isParamsArray) {
            resolve(error(false))
          }
        },
        done:(data) => {
          if(QueryBuilder.hasNoCondition) {
            resolve(ok(result as any)) // get all with no condition `Model.all()`
          } else { // get with condition `Model.get()`
            resolve(ok(data as any))
          }
        }
      })
    })
  }


}

export const queryBuilderSelectHandler = new QueryBuilderSelectHandler()
