export const operator = {
    gt: (field, arg, fieldValue, row) => {
        return fieldValue > arg;
    },
    gte: (field, arg, fieldValue, row) => {
        return fieldValue >= arg;
    },
    lt: (field, arg, fieldValue, row) => {
        return fieldValue < arg;
    },
    lte: (field, arg, fieldValue, row) => {
        console.log(`${fieldValue} <= ${arg}`);
        return fieldValue <= arg;
    },
    not: (field, arg, fieldValue, row) => {
        return fieldValue != arg;
    },
    eq: (field, arg, fieldValue, row) => {
        return fieldValue == arg;
    }
};
