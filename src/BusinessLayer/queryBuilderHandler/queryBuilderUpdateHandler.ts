import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, error, ok} from '../../Utility/Either/index.js'
import { ITableSchema } from '../_interface/interface.js'
import { RuntimeMethods as RM } from '../modelManager/runtimeMethods/runTimeMethods.js';

class QueryBuilderUpdateHandler {

  async UPDATEOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<true | number ,any>> {

    const tableName = QueryBuilder.query.table

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.update(tableName, QueryBuilder.query)({
        onsuccess:(data) => {

        },
        onerror:() => {
          resolve(error(false))
        },
        done:() => {
          resolve(ok(true))
        }
      })
    })

  }

  async UPDATEMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<true | number ,any>> {

    const tableName = QueryBuilder.query.table

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.updateMany(tableName, QueryBuilder.query)({
        onsuccess:(data) => {

        },
        onerror:() => {

        },
        done:() => {
          resolve(ok(true))
        }
      })
    })

  }

}

export const queryBuilderUpdateHandler = new QueryBuilderUpdateHandler()
