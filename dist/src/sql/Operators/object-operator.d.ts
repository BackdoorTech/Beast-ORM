export declare const operator: {
    gt: (field: any, arg: any, fieldValue: any, row: any) => boolean;
    gte: (field: any, arg: any, fieldValue: any, row: any) => boolean;
    lt: (field: any, arg: any, fieldValue: any, row: any) => boolean;
    lte: (field: any, arg: any, fieldValue: any, row: any) => boolean;
    not: (field: any, arg: any, fieldValue: any, row: any) => boolean;
    eq: (field: any, arg: any, fieldValue: any, row: any) => boolean;
    contains: (field: any, arg: any, fieldValue: any, row: any) => any;
    len(field: any, arg: any, fieldValue: any, row: any): boolean;
    hasKey(field: any, arg: any, fieldValue: any, row: any): boolean;
    containedBy(field: any, arg: any, fieldValue: any, row: any): boolean;
    overlap(field: any, arg: any, fieldValue: any, row: any): any;
    isNull(field: any, arg: any, fieldValue: any, row: any): boolean;
};
