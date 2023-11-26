import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, error, ok} from '../../Utility/Either/index.js'


class QueryBuilderUpdateHandler {

  async UPDATEOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number ,any>> {

    const tableName = QueryBuilder.query.table

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.update({table: tableName, query:QueryBuilder.query})({
        onsuccess:(data) => {

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

  async UPDATEMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number ,any>> {

    const tableName = QueryBuilder.query.table

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.updateMany({table: tableName, query:QueryBuilder.query})({
        onsuccess:(data) => {

        },
        onerror:() => {

        },
        done:() => {
          resolve(ok(1))
        }
      })
    })

  }

}

export const queryBuilderUpdateHandler = new QueryBuilderUpdateHandler()
