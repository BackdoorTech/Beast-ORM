import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/APIResponse.js';
declare class QueryBuilderUpdateHandler {
    UPDATEOne<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<true | number, any>>;
    UPDATEMany<T>(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<true | number, any>>;
}
export declare const queryBuilderUpdateHandler: QueryBuilderUpdateHandler;
export {};
