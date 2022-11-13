import { getDeep } from '../../utils.js';
export class gt {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue > arg;
    }
}
export class gte {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue >= arg;
    }
}
export class lt {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue < arg;
    }
}
export class lte {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue <= arg;
    }
}
export class not {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue != arg;
    }
}
export class eq {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue == arg;
    }
}
export class contains {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue.some(r => arg.includes(r));
    }
}
/**
 * @returns true when the given dict of key-value pairs are all contained in the field
 */
export class containsOBj {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        const keys = Object.keys(arg);
        for (let key of keys) {
            if (!rowFieldValue[key]) {
                return false;
            }
        }
        return true;
    }
}
export class containedBy {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        for (let value of rowFieldValue) {
            if (!arg.includes(value)) {
                return false;
            }
        }
        return true;
    }
}
export class overlap {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue.some(r => arg.includes(r));
    }
}
export class len {
    static validate({ fieldName, arg, rowFieldValue = [], row }) {
        return rowFieldValue.length == arg;
    }
}
export class hasKey {
    static validate({ fieldName, arg, rowFieldValue = [], row }) {
        const keys = Object.keys(arg);
        for (let key of keys) {
            if (!rowFieldValue[key]) {
                return false;
            }
        }
    }
}
export class hasAnyKeys {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return rowFieldValue.some(key => !arg.includes(key));
    }
}
/**
 * @returns true when all of the given keys are in the data
 */
export class hasKeys {
    static validate(fieldObj, keys, rowFieldValue, row) {
        for (let fieldName of keys) {
            if (!fieldObj[fieldName]) {
                return false;
            }
        }
        return true;
    }
}
// Slice transforms
export class isNull {
    static validate({ fieldName, arg, rowFieldValue, row }) {
        return (rowFieldValue == null) == arg;
    }
}
// object
export class objectIsnull {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        let rowValue;
        try {
            rowValue = getDeep(row, fieldPath);
            if (rowValue === undefined) {
                if (arg == true) {
                    return true;
                }
            }
        }
        catch (error) {
            if (arg == true) {
                return true;
            }
            return false;
        }
        console.log('fieldPath', fieldPath);
        console.log({ fieldName, arg, rowFieldValue, row }, rowValue);
        if (JSON.stringify(rowValue) == '{}' && arg == false) {
            return true;
        }
        else if (rowValue == null && arg == true) {
            return true;
        }
        else if (rowFieldValue == undefined) {
            return true;
        }
        return false;
    }
}
export class objectEq {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        const rowValue = row[fieldName];
        console.log({ row, fieldPath, rowFieldValue, arg });
        if (JSON.stringify(rowValue) == '{}' && '{}' == JSON.stringify(arg)) {
            return true;
        }
        else if (arg == null && JSON.stringify(rowValue) == '{}') {
            return true;
        }
        else if (fieldPath) {
            if (arg == rowFieldValue) {
                return true;
            }
        }
        return false;
    }
}
export class objectContains {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        console.log(fieldName, arg, row);
        let rowValue;
        try {
            rowValue = getDeep(row, fieldPath);
            if (rowValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        for (const keys of Object.keys(arg)) {
            if (!rowValue[keys]) {
                return false;
            }
            else {
                if (rowValue[keys] != arg[keys]) {
                    return false;
                }
            }
        }
        return true;
    }
}
export class objectContains_by {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        // console.log(fieldName, arg, row);
        let rowValue;
        const keyCount = Object.keys(arg).length;
        let keyFoundNEqual = 0;
        try {
            rowValue = getDeep(row, fieldPath);
            if (rowValue === undefined) {
                return false;
            }
            else {
                for (const keys of Object.keys(arg)) {
                    if (rowValue[keys]) {
                        if (rowValue[keys] == arg[keys]) {
                            keyFoundNEqual++;
                        }
                    }
                }
            }
        }
        catch (error) {
            return false;
        }
        // console.log('keyFoundNEqual', keyFoundNEqual, 'keyCount', keyCount);
        if (keyFoundNEqual == 0) {
            return true;
        }
        else if (keyFoundNEqual == keyCount) {
            return true;
        }
        return false;
    }
}
export class objectHasKey {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        console.log(fieldName, arg, row, rowFieldValue);
        let rowValue;
        try {
            rowValue = getDeep(row, fieldPath);
            if (rowValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        if (rowValue[arg]) {
            return true;
        }
        return false;
    }
}
export class objectHasKeys {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        let rowValue;
        try {
            rowValue = getDeep(row, fieldPath);
            if (rowValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        const keys = Object.keys(rowValue);
        for (const a of arg) {
            if (!keys.includes(a)) {
                return false;
            }
        }
        return true;
    }
}
export class objectHasnyKeys {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        let rowValue;
        try {
            rowValue = getDeep(row, fieldPath);
            if (rowValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        const keys = Object.keys(rowValue);
        for (const a of arg) {
            if (keys.includes(a)) {
                return true;
            }
        }
        return false;
    }
}
// array shit
export class ArrayFieldContains {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        return false;
    }
}
export class ArrayFieldContains_by {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        return false;
    }
}
export class ArrayFieldContains_overlap {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        return false;
    }
}
export class ArrayFieldContains_len {
    static validate({ fieldName, arg, rowFieldValue, row, fieldPath }) {
        return false;
    }
}
