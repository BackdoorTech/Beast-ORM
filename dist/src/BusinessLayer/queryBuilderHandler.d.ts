import { QueryBuilder } from '../Presentation/queryBuilder/queryBuilder.js';
import { IDatabaseStrategy } from "../DataAccess/DriverAdapters/DriverAdapter.type.js";
declare class QueryBuilderHandler {
    INSERT(DatabaseStrategy: IDatabaseStrategy, QueryBuilder: QueryBuilder): Promise<unknown>;
}
export declare const queryBuilderHandler: QueryBuilderHandler;
export {};
