import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/index.js';
import { TransactionAbortion } from '../../DataAccess/_interface/interface.type.js';
declare class QueryBuilderInsertHandler {
    INSERTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder, arrayOfDataBackup: Object[]): Promise<Either<T, TransactionAbortion>>;
    INSERTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder, arrayOfDataBackup: Object[]): Promise<Either<T, TransactionAbortion>>;
}
export declare const queryBuilderInsertHandler: QueryBuilderInsertHandler;
export {};
