export declare class gt {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class gte {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class lt {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class lte {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class not {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class eq {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class contains {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): any;
}
/**
 * @returns true when the given dict of key-value pairs are all contained in the field
 */
export declare class containsOBj {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class containedBy {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class overlap {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): any;
}
export declare class len {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue?: any[];
        row: any;
    }): boolean;
}
export declare class hasKey {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue?: any[];
        row: any;
    }): boolean;
}
export declare class hasAnyKeys {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): any;
}
/**
 * @returns true when all of the given keys are in the data
 */
export declare class hasKeys {
    static validate(fieldObj: any, keys: any, rowFieldValue: any, row: any): boolean;
}
export declare class isNull {
    static validate({ fieldName, arg, rowFieldValue, row }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
    }): boolean;
}
export declare class objectIsnull {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class objectEq {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class objectContains {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class objectContains_by {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class objectHasKey {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class objectHasKeys {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class objectHasnyKeys {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class ArrayFieldContains {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class ArrayFieldContains_by {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class ArrayFieldContains_overlap {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
export declare class ArrayFieldContains_len {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        fieldPath: any;
    }): boolean;
}
