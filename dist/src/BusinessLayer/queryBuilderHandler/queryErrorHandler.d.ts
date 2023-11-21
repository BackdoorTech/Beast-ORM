import { IQuery } from "../_interface/Apresentation/queryBuilder";
export declare class ItemNotFound {
    type: string;
    table: string;
    where: any[];
    limit: number;
    constructor(IQuery: IQuery);
}
