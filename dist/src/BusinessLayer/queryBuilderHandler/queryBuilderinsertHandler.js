import { error, ok } from '../../Utility/Either/index.js';
import { RuntimeMethods as RM } from '../modelManager/runtimeMethods/runTimeMethods.js';
import { ConstraintError, TransactionAbortion } from '../../DataAccess/_interface/interface.type.js';
class QueryBuilderInsertHandler {
    async INSERTOne(DatabaseStrategy, QueryBuilder, arrayOfDataBackup) {
        const dataToInsert = QueryBuilder.query.values;
        const tableName = QueryBuilder.query.table;
        const model = QueryBuilder.model;
        const schema = model[RM.getTableSchema]();
        const idFieldName = schema.id.keyPath;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.insert({ table: tableName, rows: dataToInsert })({
                onsuccess: (data) => {
                    const id = data.data;
                    const index = data.index;
                    arrayOfDataBackup[index][idFieldName] = id;
                    const newInstanceOfModel = new model();
                    Object.assign(newInstanceOfModel, arrayOfDataBackup[index]);
                    resolve(ok(newInstanceOfModel));
                },
                onerror: (_error) => {
                    const errorCause = new ConstraintError({ message: _error });
                    const errorFamily = new TransactionAbortion();
                    errorFamily.setCause(errorCause);
                    resolve(error(errorFamily));
                },
                done: () => {
                    // console.log("done")
                }
            });
        });
    }
    async INSERTMany(DatabaseStrategy, QueryBuilder, arrayOfDataBackup) {
        const dataToInsert = QueryBuilder.query.values;
        const result = [];
        const tableName = QueryBuilder.query.table;
        const model = QueryBuilder.model;
        const schema = model[RM.getTableSchema]();
        const idFieldName = schema.id.keyPath;
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.insertMany({ table: tableName, rows: dataToInsert })({
                onsuccess: (data) => {
                    const id = data.data;
                    const index = data.index;
                    arrayOfDataBackup[index][idFieldName] = id;
                    const newInstanceOfModel = new model();
                    Object.assign(newInstanceOfModel, arrayOfDataBackup[index]);
                    result.push(newInstanceOfModel);
                },
                onerror: (_error) => {
                    const errorCause = new ConstraintError({ message: _error });
                    const errorFamily = new TransactionAbortion();
                    errorFamily.setCause(errorCause);
                    resolve(error(errorFamily));
                },
                done: () => {
                    resolve(ok(result));
                }
            });
        });
    }
}
export const queryBuilderInsertHandler = new QueryBuilderInsertHandler();
