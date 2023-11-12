import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/index.js';
declare class QueryBuilderSelectHandler {
    SELECTOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, any>>;
    SELECTMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, any>>;
}
export declare const queryBuilderSelectHandler: QueryBuilderSelectHandler;
export {};
