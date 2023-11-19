import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/APIResponse.js';
declare class QueryBuilderInsertHandler {
    INSERTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder, arrayOfDataBackup: Object[]): Promise<Either<T, any>>;
    INSERTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder, arrayOfDataBackup: Object[]): Promise<Either<T, any>>;
}
export declare const queryBuilderInsertHandler: QueryBuilderInsertHandler;
export {};
