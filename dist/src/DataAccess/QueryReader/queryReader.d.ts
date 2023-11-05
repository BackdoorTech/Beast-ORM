import { IQuery } from "../../BusinessLayer/_interface/Apresentation/queryBuilder";
export declare class QueryReaderSelect implements IQuery {
    type: string;
    table: string;
    values: any[];
    updateValues: any;
    where: any[];
    limit: number;
    hasIndex: Boolean;
    isParamsArray: Boolean;
    constructor(Query: IQuery);
    get hasNoCondition(): boolean;
    get isInsertOne(): boolean;
    get hasLimit(): boolean;
}
export declare function CreateQueryReaderSelect(Query: IQuery): QueryReaderSelect;
