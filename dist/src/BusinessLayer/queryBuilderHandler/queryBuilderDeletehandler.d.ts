import { QueryBuilder } from '../../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../../DataAccess/DriverAdapters/DriverAdapter.type.js";
import { Either } from '../../Utility/Either/index.js';
declare class QueryBuilderDeleteHandler {
    DELETEOne(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number, false>>;
    DELETEMany(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<Either<number, number>>;
}
export declare const queryBuilderDeleteHandler: QueryBuilderDeleteHandler;
export {};
