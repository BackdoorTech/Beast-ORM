import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { ItemNotFound } from './queryErrorHandler.js'
import { Either, error, ok } from '../../Utility/Either/index.js'

class QueryBuilderSelectHandler {

  async SELECTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, ItemNotFound>> {

    const tableName = QueryBuilder.query.table
    const model = QueryBuilder.model

    return await new Promise((resolve, reject) => {

      DatabaseStrategy.select(tableName, QueryBuilder.query)({
        onsuccess:(data:any) => {},
        onerror:() => {
          resolve(error(false as any))
        },
        notFound:() => {
          resolve(error(new ItemNotFound(QueryBuilder.query)))
        },
        done:(data) => {

          const newInstanceOfModel = new model()

          Object.assign(newInstanceOfModel, data[0])

          resolve(ok(newInstanceOfModel as any))
        }
      })
    })
  }

  async SELECTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T[],any>> {

    const tableName = QueryBuilder.query.table
    const model = QueryBuilder.model

    const result: T[] = []
    return await new Promise((resolve, reject) => {
      DatabaseStrategy.selectMany(tableName, QueryBuilder.query)({
        onsuccess:(data:[]) => {

          const modelInstances: T[] = data.map( e => Object.assign(new model(),e))

          for(const modelInstance of modelInstances) {
            result.push(modelInstance)
          }

        },
        onerror:() => {
          resolve(error(false))
        },
        done:(data: any[]) => {
          
          resolve(ok(result))
        }
      })
    })
  }


}

export const queryBuilderSelectHandler = new QueryBuilderSelectHandler()
