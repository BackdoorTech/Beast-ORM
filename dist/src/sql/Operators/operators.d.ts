export declare class gt {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class gte {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class lt {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class lte {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class not {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class eq {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class contains {
    static validate(field: any, arg: any, fieldValue: any, row: any): any;
}
/**
 * @returns true when the given dict of key-value pairs are all contained in the field
 */
export declare class containsOBj {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
export declare class containedBy {
    static validate(field: any, arg: any, arrayFieldValues: any, row: any): boolean;
}
export declare class overlap {
    static validate(field: any, arg: any, fieldValue: any, row: any): any;
}
export declare class len {
    static validate(field: any, arg: any, fieldValue: any[], row: any): boolean;
}
export declare class hasKey {
    static validate(field: any, arg: any, fieldValue: any[], row: any): boolean;
}
export declare class hasAnyKeys {
    static validate(field: any, arg: any, fieldValue: any, row: any): any;
}
/**
 * @returns true when all of the given keys are in the data
 */
export declare class hasKeys {
    static validate(fieldObj: any, keys: any, fieldValue: any, row: any): boolean;
}
export declare class isNull {
    static validate(field: any, arg: any, fieldValue: any, row: any): boolean;
}
