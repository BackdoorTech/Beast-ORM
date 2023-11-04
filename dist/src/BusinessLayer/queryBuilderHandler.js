import { ok } from '../Utility/Either/index.js';
import { RuntimeMethods as RM } from './modelManager/runtimeMethods/runTimeMethods.js';
class QueryBuilderHandler {
    async INSERT(DatabaseStrategy, QueryBuilder) {
        const dataToInsert = QueryBuilder.query.values;
        const result = [];
        const tableName = QueryBuilder.query.table;
        const model = QueryBuilder.model;
        const schema = model[RM.getTableSchema]();
        const idFieldName = schema.id.keyPath;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.insert(tableName, dataToInsert)({
                onsuccess: (data) => {
                    const id = data.data;
                    const index = data.index;
                    dataToInsert[index][idFieldName] = id;
                    const newInstanceOfModel = new model();
                    Object.assign(newInstanceOfModel, dataToInsert[index]);
                    result.push(newInstanceOfModel);
                },
                done: () => {
                    resolve(ok(QueryBuilder.isParamsArray ? result : result[0]));
                }
            });
        });
    }
}
export const queryBuilderHandler = new QueryBuilderHandler();
