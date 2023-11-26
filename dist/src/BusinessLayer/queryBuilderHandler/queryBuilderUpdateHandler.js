import { error, ok } from '../../Utility/Either/index.js';
class QueryBuilderUpdateHandler {
    async UPDATEOne(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.update({ table: tableName, query: QueryBuilder.query })({
                onsuccess: (data) => {
                },
                onerror: () => {
                    resolve(error(false));
                },
                done: () => {
                    resolve(ok(1));
                }
            });
        });
    }
    async UPDATEMany(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.updateMany({ table: tableName, query: QueryBuilder.query })({
                onsuccess: (data) => {
                },
                onerror: () => {
                },
                done: () => {
                    resolve(ok(1));
                }
            });
        });
    }
}
export const queryBuilderUpdateHandler = new QueryBuilderUpdateHandler();
