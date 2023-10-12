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
    gt: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.gt.validate({ fieldName, arg, row, fieldPath, customData });
    },
    gte: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.gte.validate({ fieldName, arg, row, fieldPath, customData });
    },
    lt: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.lt.validate({ fieldName, arg, row, fieldPath, customData });
    },
    lte: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.lte.validate({ fieldName, arg, row, fieldPath });
    },
    not: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.not.validate({ fieldName, arg, row, fieldPath });
    },
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.eq.validate({ fieldName, arg, row, fieldPath, customData });
    },
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.contains.validate({ fieldName, arg, row, fieldPath, customData });
    },
    len({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.len.validate({ fieldName, arg, row, fieldPath, customData });
    },
    hasKey({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.hasKey.validate({ fieldName, arg, row, fieldPath, customData });
    },
    containedBy({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.containedBy.validate({ fieldName, arg, row, fieldPath, customData });
    },
    overlap({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.overlap.validate({ fieldName, arg, row, fieldPath, customData });
    },
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.isNull.validate({ fieldName, arg, row, fieldPath, customData });
    },
    iexact({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.iexact.validate({ fieldName, arg, row, fieldPath, customData });
    }
};
export const ObjOperatorOverwrite = Object.assign(Object.assign({}, operator), {
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.objectIsnull.validate({ fieldName, arg, row, fieldPath, customData });
    },
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.objectEq.validate({ fieldName, arg, row, fieldPath, customData });
    },
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.objectContains.validate({ fieldName, arg, row, fieldPath, customData });
    },
    contained_by: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.objectContains_by.validate({ fieldName, arg, row, fieldPath, customData });
    },
    has_key({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.objectHasKey.validate({ fieldName, arg, row, fieldPath, customData });
    },
    has_keys({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.objectHasKeys.validate({ fieldName, arg, row, fieldPath, customData });
    },
    has_any_keys({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.objectHasnyKeys.validate({ fieldName, arg, row, fieldPath, customData });
    }
});
export const ArrOperatorOverwrite = Object.assign(Object.assign({}, operator), {
    isNull({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) {
        return operatorsObject.objectIsnull.validate({ fieldName, arg, row, fieldPath, customData });
    },
    eq: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.ArrayFieldEq.validate({ fieldName, arg, row, fieldPath, customData });
    },
    contains: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.ArrayFieldContains.validate({ fieldName, arg, row, fieldPath, customData });
    },
    contained_by: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.ArrayFieldContains_by.validate({ fieldName, arg, row, fieldPath, customData });
    },
    len: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.ArrayFieldContains_len.validate({ fieldName, arg, row, fieldPath, customData });
    },
    overlap: ({ fieldName, arg, row, TableSchema, element, fieldPath, customData }) => {
        return operatorsObject.ArrayFieldContains_overlap.validate({ fieldName, arg, row, fieldPath, customData });
    }
});
