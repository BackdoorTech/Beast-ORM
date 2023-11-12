import { error, ok } from '../../Utility/Either/index.js';
class QueryBuilderSelectHandler {
    async SELECTOne(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let result = [];
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.select(tableName, QueryBuilder.query)({
                onsuccess: (data) => { },
                onerror: () => {
                    resolve(error(false));
                },
                done: (data) => {
                    if (QueryBuilder.hasNoCondition) {
                        resolve(ok(result)); // get all with no condition `Model.all()`
                    }
                    else { // get with condition `Model.get()`
                        resolve(ok(data[0]));
                    }
                }
            });
        });
    }
    async SELECTMany(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let result = [];
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.selectMany(tableName, QueryBuilder.query)({
                onsuccess: (data) => {
                    result = data.data; // get all with no condition `Model.all()`
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
                        resolve(ok(data));
                    }
                }
            });
        });
    }
}
export const queryBuilderSelectHandler = new QueryBuilderSelectHandler();
