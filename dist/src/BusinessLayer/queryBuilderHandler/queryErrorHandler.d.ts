import { IQuery } from "../_interface/Apresentation/queryBuilder";
export declare class ItemNotFound {
    type: string;
    table: string;
    where: any[];
    limit: number;
    constructor(IQuery: IQuery);
}
export declare class UniqueField {
    message: string;
    data: string;
    table: string;
    where: any[];
    limit: number;
    constructor(IQuery: IQuery);
}
export declare class BulkDataUniqueFieldError {
    table: string;
    rows: any[];
    data: any[];
    index: number;
    message: string;
    constructor({ table, rows, data, index }: {
        table: any;
        rows: any;
        data: any;
        index: any;
    });
    printMessage(): void;
}
