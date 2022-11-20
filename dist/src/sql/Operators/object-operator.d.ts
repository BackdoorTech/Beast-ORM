export declare const OperatorsKeysArray: readonly ["gt", "gte", "lt", "lte", "not", "eq", "contains", "len", "hasKey", "ForeignKey", "containedBy", "overlap", "isNull", "contained_by", "has_key", "has_keys", "has_any_keys", "len", "overlap", "iexact"];
export declare type OperatorKeys = typeof OperatorsKeysArray[number];
export declare const operator: {
    gt: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    gte: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    lt: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    lte: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    not: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => any;
    len({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    hasKey({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    containedBy({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    overlap({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): any;
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    iexact({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
};
export declare const ObjOperatorOverwrite: {
    gt: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    gte: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    lt: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    lte: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    not: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => any;
    len({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    hasKey({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    containedBy({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    overlap({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): any;
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    iexact({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
} & {
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contained_by: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    has_key({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    has_keys({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    has_any_keys({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
};
export declare const ArrOperatorOverwrite: {
    gt: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    gte: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    lt: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    lte: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    not: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => any;
    len({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    hasKey({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    containedBy({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    overlap({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): any;
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    iexact({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
} & {
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }): boolean;
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    contained_by: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    len: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
    overlap: ({ fieldName, arg, row, TableSchema, element, fieldPath }: {
        fieldName: any;
        arg: any;
        row: any;
        TableSchema: any;
        element: any;
        fieldPath: any;
    }) => boolean;
};
