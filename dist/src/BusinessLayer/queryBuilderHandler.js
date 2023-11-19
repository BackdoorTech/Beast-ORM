import { error, ok } from '../Utility/Either/APIResponse.js';
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
                onerror: () => {
                    if (!QueryBuilder.query.isParamsArray) {
                        resolve(error(false));
                    }
                },
                done: () => {
                    resolve(ok(QueryBuilder.query.isParamsArray ? result : result[0]));
                }
            });
        });
    }
    async SELECT(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let result = [];
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.select(tableName, QueryBuilder.query)({
                onsuccess: (data) => {
                    if (Array.isArray(data.data)) {
                        result = data.data; // get all with no condition `Model.all()`
                    }
                },
                onerror: () => {
                    if (!QueryBuilder.query.isParamsArray) {
                        resolve(error(false));
                    }
                },
                done: (data) => {
                    if (QueryBuilder.hasNoCondition) {
                        resolve(ok(result)); // get all with no condition `Model.all()`
                    }
                    else { // get with condition `Model.get()`
                        resolve(ok(QueryBuilder.query.isParamsArray ? data : data[0]));
                    }
                }
            });
        });
    }
    async UPDATE(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.update(tableName, QueryBuilder.query)({
                onsuccess: (data) => {
                },
                onerror: () => {
                    if (!QueryBuilder.query.isParamsArray) {
                        resolve(error(false));
                    }
                },
                done: () => {
                    if (!QueryBuilder.query.isParamsArray) {
                        resolve(ok(true));
                    }
                }
            });
        });
    }
    async DELETE(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let deleteCount = 0;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.delete(tableName, QueryBuilder.query)({
                onsuccess: () => {
                    deleteCount++;
                },
                onerror: () => {
                    if (!QueryBuilder.query.isParamsArray) {
                        resolve(error(false));
                    }
                },
                done: (count) => {
                    if (!QueryBuilder.query.isParamsArray) {
                        resolve(ok(true));
                        return;
                    }
                    if (count) {
                        deleteCount = count;
                    }
                    resolve(ok(deleteCount));
                }
            });
        });
    }
}
export const queryBuilderHandler = new QueryBuilderHandler();
