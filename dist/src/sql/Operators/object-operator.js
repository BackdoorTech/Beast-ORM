import * as operatorsObject from './operators.js';
export const OperatorsKeysArray = [
    'gt',
    'gte',
    'lt',
    'lte',
    'not',
    'eq',
    'contains',
    'len',
    'hasKey',
    'ForeignKey',
    'containedBy',
    'overlap',
    'isNull',
    'contained_by',
    'has_key',
    'has_keys',
    'has_any_keys',
    'len',
    'overlap',
    'iexact'
]; // TS3.4 syntax
export const operator = {
    gt: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.gt.validate({ fieldName, arg, row, fieldPath });
    },
    gte: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.gte.validate({ fieldName, arg, row, fieldPath });
    },
    lt: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.lt.validate({ fieldName, arg, row, fieldPath });
    },
    lte: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.lte.validate({ fieldName, arg, row, fieldPath });
    },
    not: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.not.validate({ fieldName, arg, row, fieldPath });
    },
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        console.log(fieldName);
        return operatorsObject.eq.validate({ fieldName, arg, row, fieldPath });
    },
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.contains.validate({ fieldName, arg, row, fieldPath });
    },
    len({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.len.validate({ fieldName, arg, row, fieldPath });
    },
    hasKey({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.hasKey.validate({ fieldName, arg, row, fieldPath });
    },
    containedBy({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.containedBy.validate({ fieldName, arg, row, fieldPath });
    },
    overlap({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.overlap.validate({ fieldName, arg, row, fieldPath });
    },
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        console.log(fieldName, arg, row, TableSchema, element, fieldPath);
        return operatorsObject.isNull.validate({ fieldName, arg, row, fieldPath });
    },
    iexact({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.iexact.validate({ fieldName, arg, row, fieldPath });
    }
};
export const ObjOperatorOverwrite = Object.assign(Object.assign({}, operator), {
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        // console.log(fieldName, arg,  row, TableSchema, element)
        return operatorsObject.objectIsnull.validate({ fieldName, arg, row, fieldPath });
    },
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectEq.validate({ fieldName, arg, row, fieldPath });
    },
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectContains.validate({ fieldName, arg, row, fieldPath });
    },
    contained_by: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectContains_by.validate({ fieldName, arg, row, fieldPath });
    },
    has_key({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectHasKey.validate({ fieldName, arg, row, fieldPath });
    },
    has_keys({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectHasKeys.validate({ fieldName, arg, row, fieldPath });
    },
    has_any_keys({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectHasnyKeys.validate({ fieldName, arg, row, fieldPath });
    }
});
export const ArrOperatorOverwrite = Object.assign(Object.assign({}, operator), {
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectIsnull.validate({ fieldName, arg, row, fieldPath });
    },
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.ArrayFieldEq.validate({ fieldName, arg, row, fieldPath });
    },
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.ArrayFieldContains.validate({ fieldName, arg, row, fieldPath });
    },
    contained_by: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.ArrayFieldContains_by.validate({ fieldName, arg, row, fieldPath });
    },
    len: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.ArrayFieldContains_len.validate({ fieldName, arg, row, fieldPath });
    },
    overlap: ({ fieldName, arg, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.ArrayFieldContains_overlap.validate({ fieldName, arg, row, fieldPath });
    }
});
