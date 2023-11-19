import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, error, ok} from '../../Utility/Either/APIResponse.js'

class QueryBuilderSelectHandler {

  async SELECTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

    const tableName = QueryBuilder.query.table
    const model = QueryBuilder.model

    return await new Promise((resolve, reject) => {

      DatabaseStrategy.select(tableName, QueryBuilder.query)({
        onsuccess:(data:any) => {},
        onerror:() => {
          resolve(error(false))
        },
        done:(data) => {

          const newInstanceOfModel = new model()

          Object.assign(newInstanceOfModel, data[0])

          resolve(ok(newInstanceOfModel as any))
        }
      })
    })
  }

  async SELECTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

    const tableName = QueryBuilder.query.table
    const model = QueryBuilder.model

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.selectMany(tableName, QueryBuilder.query)({
        onsuccess:(data:any) => {},
        onerror:() => {
          resolve(error(false))
        },
        done:(data: any[]) => {

          data = data.map( e => Object.assign(new model(),e))
          resolve(ok(data as any))
        }
      })
    })
  }


}

export const queryBuilderSelectHandler = new QueryBuilderSelectHandler()
