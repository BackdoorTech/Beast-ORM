import { error, ok } from '../../Utility/Either/APIResponse.js';
class QueryBuilderUpdateHandler {
    async UPDATEOne(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.update(tableName, QueryBuilder.query)({
                onsuccess: (data) => {
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
    async UPDATEMany(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.updateMany(tableName, QueryBuilder.query)({
                onsuccess: (data) => {
                },
                onerror: () => {
                },
                done: () => {
                    resolve(ok(true));
                }
            });
        });
    }
}
export const queryBuilderUpdateHandler = new QueryBuilderUpdateHandler();
