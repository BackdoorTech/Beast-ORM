import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js'
import { IDatabaseStrategy } from "../DataAccess/DriverAdapters/DriverAdapter.type.js"
import { Either, ok} from '../Utility/Either/index.js'
import { ITableSchema } from './_interface/interface.js'
import { RuntimeMethods as RM } from './modelManager/runtimeMethods/runTimeMethods.js';

class QueryBuilderHandler {
  async INSERT<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T,any>> {

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
        done:() => {
          resolve(ok(QueryBuilder.isParamsArray? result: result[0]))
        }
      })
    })

  }
}

export const queryBuilderHandler = new QueryBuilderHandler()
