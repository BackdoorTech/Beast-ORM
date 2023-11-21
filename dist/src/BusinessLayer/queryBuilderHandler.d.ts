import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../Utility/Either/index.js';
declare class QueryBuilderHandler {
    INSERT<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, any>>;
    SELECT<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<T, any>>;
    UPDATE<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<true | number, any>>;
    DELETE(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<true | number, false | number>>;
}
export declare const queryBuilderHandler: QueryBuilderHandler;
export {};
