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
    'has_any_keys'
]; // TS3.4 syntax
export const operator = {
    gt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        return operatorsObject.gt.validate({ fieldName, arg, rowFieldValue, row });
    },
    gte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        return operatorsObject.gte.validate({ fieldName, arg, rowFieldValue, row });
    },
    lt: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        return operatorsObject.lt.validate({ fieldName, arg, rowFieldValue, row });
    },
    lte: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        return operatorsObject.lte.validate({ fieldName, arg, rowFieldValue, row });
    },
    not: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        return rowFieldValue != arg;
    },
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        console.log(fieldName);
        return operatorsObject.eq.validate({ fieldName, arg, rowFieldValue, row });
    },
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element }) => {
        return operatorsObject.contains.validate({ fieldName, arg, rowFieldValue, row });
    },
    len({ fieldName, arg, rowFieldValue, row, TableSchema, element }) {
        return operatorsObject.len.validate({ fieldName, arg, rowFieldValue, row });
    },
    hasKey({ fieldName, arg, rowFieldValue, row, TableSchema, element }) {
        return operatorsObject.hasKey.validate({ fieldName, arg, rowFieldValue, row });
    },
    containedBy({ fieldName, arg, rowFieldValue, row, TableSchema, element }) {
        return operatorsObject.containedBy.validate({ fieldName, arg, rowFieldValue, row });
    },
    overlap({ fieldName, arg, rowFieldValue, row, TableSchema, element }) {
        return operatorsObject.overlap.validate({ fieldName, arg, rowFieldValue, row });
    },
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element }) {
        console.log(fieldName, arg, rowFieldValue, row, TableSchema, element);
        return operatorsObject.isNull.validate({ fieldName, arg, rowFieldValue, row });
    },
};
export const ObjOperatorOverwrite = Object.assign(Object.assign({}, operator), {
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element, fieldPath }) {
        // console.log(fieldName, arg, rowFieldValue, row, TableSchema, element)
        return operatorsObject.objectIsnull.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectEq.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectContains.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    contained_by: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectContains_by.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    has_key({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectHasKey.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    has_keys({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectHasKeys.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    has_any_keys({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectHasnyKeys.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    }
});
export const ArrOperatorOverwrite = Object.assign(Object.assign({}, operator), {
    isNull({ fieldName, rowFieldValue, arg, row, TableSchema, element, fieldPath }) {
        return operatorsObject.objectIsnull.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    eq: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectEq.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    contains: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectContains.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
    contained_by: ({ fieldName, arg, rowFieldValue, row, TableSchema, element, fieldPath }) => {
        return operatorsObject.objectContains_by.validate({ fieldName, arg, rowFieldValue, row, fieldPath });
    },
});
