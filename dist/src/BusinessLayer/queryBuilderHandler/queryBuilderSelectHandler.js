import { ItemNotFound } from './queryErrorHandler.js';
import { error, ok } from '../../Utility/Either/index.js';
class QueryBuilderSelectHandler {
    async SELECTOne(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        const model = QueryBuilder.model;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.select(tableName, QueryBuilder.query)({
                onsuccess: (data) => { },
                onerror: () => {
                    resolve(error(false));
                },
                notFound: () => {
                    resolve(error(new ItemNotFound(QueryBuilder.query)));
                },
                done: (data) => {
                    const newInstanceOfModel = new model();
                    Object.assign(newInstanceOfModel, data[0]);
                    resolve(ok(newInstanceOfModel));
                }
            });
        });
    }
    async SELECTMany(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        const model = QueryBuilder.model;
        const result = [];
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.selectMany(tableName, QueryBuilder.query)({
                onsuccess: (data) => {
                    const modelInstances = data.map(e => Object.assign(new model(), e));
                    for (const modelInstance of modelInstances) {
                        result.push(modelInstance);
                    }
                },
                onerror: () => {
                    resolve(error(false));
                },
                done: (data) => {
                    resolve(ok(result));
                }
            });
        });
    }
}
export const queryBuilderSelectHandler = new QueryBuilderSelectHandler();
