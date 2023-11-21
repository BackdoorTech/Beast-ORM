import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/index.js';
declare class QueryBuilderUpdateHandler {
    UPDATEOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number, any>>;
    UPDATEMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number, any>>;
}
export declare const queryBuilderUpdateHandler: QueryBuilderUpdateHandler;
export {};
