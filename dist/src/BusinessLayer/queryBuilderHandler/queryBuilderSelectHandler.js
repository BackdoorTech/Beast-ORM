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
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.selectMany(tableName, QueryBuilder.query)({
                onsuccess: (data) => { },
                onerror: () => {
                    resolve(error(false));
                },
                done: (data) => {
                    data = data.map(e => Object.assign(new model(), e));
                    resolve(ok(data));
                }
            });
        });
    }
}
export const queryBuilderSelectHandler = new QueryBuilderSelectHandler();
