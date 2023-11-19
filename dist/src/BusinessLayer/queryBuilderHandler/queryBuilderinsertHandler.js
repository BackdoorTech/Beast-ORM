import { error, ok } from '../../Utility/Either/APIResponse.js';
import { RuntimeMethods as RM } from '../modelManager/runtimeMethods/runTimeMethods.js';
class QueryBuilderInsertHandler {
    async INSERTOne(DatabaseStrategy, QueryBuilder, arrayOfDataBackup) {
        const dataToInsert = QueryBuilder.query.values;
        const tableName = QueryBuilder.query.table;
        const model = QueryBuilder.model;
        const schema = model[RM.getTableSchema]();
        const idFieldName = schema.id.keyPath;
        const relationship = (schema.fieldTypes["OneToOneField"] || []).concat(schema.fieldTypes["ForeignKey"] || []);
        const fieldNames = schema.fieldNames.filter(e => !relationship.find(b => b == e));
        fieldNames.push(idFieldName);
        return await new Promise((resolve, reject) => {
            DatabaseStrategy.insert(tableName, dataToInsert)({
                onsuccess: (data) => {
                    const id = data.data;
                    const index = data.index;
                    arrayOfDataBackup[index][idFieldName] = id;
                    const newInstanceOfModel = new model();
                    Object.assign(newInstanceOfModel, arrayOfDataBackup[index]);
                    resolve(ok(newInstanceOfModel));
                },
                onerror: () => {
                    resolve(error(false));
                },
                done: () => { }
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
            DatabaseStrategy.insertMany(tableName, dataToInsert)({
                onsuccess: (data) => {
                    const id = data.data;
                    const index = data.index;
                    arrayOfDataBackup[index][idFieldName] = id;
                    const newInstanceOfModel = new model();
                    Object.assign(newInstanceOfModel, arrayOfDataBackup[index]);
                    result.push(newInstanceOfModel);
                },
                onerror: () => { },
                done: () => {
                    resolve(ok(result));
                }
            });
        });
    }
}
export const queryBuilderInsertHandler = new QueryBuilderInsertHandler();
