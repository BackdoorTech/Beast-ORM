import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/index.js';
declare class QueryBuilderInsertHandler {
    INSERTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, any>>;
    INSERTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, any>>;
}
export declare const queryBuilderInsertHandler: QueryBuilderInsertHandler;
export {};
