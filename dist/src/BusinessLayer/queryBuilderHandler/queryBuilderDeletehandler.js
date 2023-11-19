import { error, ok } from '../../Utility/Either/APIResponse.js';
class QueryBuilderDeleteHandler {
    async DELETEOne(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let deleteCount = 0;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.delete(tableName, QueryBuilder.query)({
                onsuccess: () => {
                    deleteCount++;
                },
                onerror: () => {
                    resolve(error(false));
                },
                done: () => {
                    resolve(ok(true));
                }
            });
        });
    }
    async DELETEMany(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let deleteCount = 0;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.deleteMany(tableName, QueryBuilder.query)({
                onsuccess: () => {
                    deleteCount++;
                },
                onerror: () => { },
                done: (count) => {
                    resolve(ok(count));
                }
            });
        });
    }
}
export const queryBuilderDeleteHandler = new QueryBuilderDeleteHandler();
