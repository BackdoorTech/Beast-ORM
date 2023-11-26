import { error, ok } from '../../Utility/Either/index.js';
class QueryBuilderDeleteHandler {
    async DELETEOne(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let deleteCount = 0;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.delete({ table: tableName, query: QueryBuilder.query })({
                onsuccess: () => {
                    deleteCount++;
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
    async DELETEMany(DatabaseStrategy, QueryBuilder) {
        const tableName = QueryBuilder.query.table;
        let deleteCount = 0;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.deleteMany({ table: tableName, query: QueryBuilder.query })({
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
