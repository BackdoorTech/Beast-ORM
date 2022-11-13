export declare const OperatorsKeysArray: readonly ["gt", "gte", "lt", "lte", "not", "eq", "contains", "len", "hasKey", "ForeignKey", "containedBy", "overlap", "isNull", "contained_by", "has_key", "has_keys", "has_any_keys"];
export declare type OperatorKeys = typeof OperatorsKeysArray[number];
export declare const operator: {
    gt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    gte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    lt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    lte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    not: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => any;
    len({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    hasKey({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    containedBy({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    overlap({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): any;
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element }: {
        fieldName: any;
        rowFieldValue: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
};
export declare const ObjOperatorOverwrite: {
    gt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    gte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    lt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    lte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    not: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => any;
    len({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    hasKey({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    containedBy({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    overlap({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): any;
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element }: {
        fieldName: any;
        rowFieldValue: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
} & {
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        rowFieldValue: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contained_by: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    has_key({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    has_keys({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    has_any_keys({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
};
export declare const ArrOperatorOverwrite: {
    gt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    gte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    lt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    lte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    not: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => boolean;
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }) => any;
    len({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    hasKey({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    containedBy({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
    overlap({ fieldName, arg, rowFieldValue, row, TableSchema, element }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
    }): any;
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element }: {
        fieldName: any;
        rowFieldValue: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
    }): boolean;
} & {
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        rowFieldValue: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contained_by: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        rowFieldValue: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
};
