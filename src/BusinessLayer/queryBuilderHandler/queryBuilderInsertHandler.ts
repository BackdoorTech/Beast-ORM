import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, error, ok} from '../../Utility/Either/index.js'
import { ITableSchema } from '../_interface/interface.js'
import { RuntimeMethods as RM } from '../modelManager/runtimeMethods/runTimeMethods.js';

class QueryBuilderInsertHandler {
  async INSERTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

    const dataToInsert = QueryBuilder.query.values
    const result = []
    const tableName = QueryBuilder.query.table
    const model = QueryBuilder.model
    const schema: ITableSchema = model[RM.getTableSchema]()
    const idFieldName = schema.id.keyPath;

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.insert(tableName, dataToInsert)({
        onsuccess:(data) => {
          const id = data.data;
          const index = data.index
          dataToInsert[index][idFieldName] =  id

          const newInstanceOfModel = new model()
          Object.assign(newInstanceOfModel, dataToInsert[index])
          result.push(newInstanceOfModel)
        },
        onerror:() => {
          resolve(error(false))
        },
        done:() => {
          resolve(ok(result[0]))
        }
      })
    })

  }


  async INSERTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

    const dataToInsert = QueryBuilder.query.values
    const result = []
    const tableName = QueryBuilder.query.table
    const model = QueryBuilder.model
    const schema: ITableSchema = model[RM.getTableSchema]()
    const idFieldName = schema.id.keyPath;

    return await new Promise((resolve, reject) => {
      DatabaseStrategy.insertMany(tableName, dataToInsert)({
        onsuccess:(data) => {
          const id = data.data;
          const index = data.index
          dataToInsert[index][idFieldName] =  id

          const newInstanceOfModel = new model()
          Object.assign(newInstanceOfModel, dataToInsert[index])
          result.push(newInstanceOfModel)
        },
        onerror:() => {},
        done:() => {
          resolve(ok(result as any))
        }
      })
    })

  }

}

export const queryBuilderInsertHandler = new QueryBuilderInsertHandler()
