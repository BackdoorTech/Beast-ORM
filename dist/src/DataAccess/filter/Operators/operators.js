import { getDeep } from "../../../Utility/utils.js";
export class gt {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue > arg;
    }
}
export class iexact {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue === arg;
    }
}
export class gte {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue >= arg;
    }
}
export class lt {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        // console.log(_rowFieldValue, arg)
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue < arg;
    }
}
export class lte {
    static validate({ fieldName, arg, row, fieldPath }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            // console.log(_rowFieldValue, arg)
            return _rowFieldValue <= arg;
        }
        catch (error) {
            return false;
        }
    }
}
export class not {
    static validate({ fieldName, arg, row, fieldPath }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue != arg;
    }
}
export class eq {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue == arg;
    }
}
export class contains {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue.some(r => arg.includes(r));
    }
}
export class info {
    static run({ row, fieldPath }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return {
                    present: false,
                    value: undefined
                };
            }
        }
        catch (error) {
            return {
                present: false,
                value: undefined
            };
        }
        return {
            present: true,
            value: undefined
        };
    }
}
export class containsOBj {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        const keys = Object.keys(arg);
        for (let key of keys) {
            if (!_rowFieldValue[key]) {
                return false;
            }
        }
        return true;
    }
}
export class containedBy {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        for (let value of _rowFieldValue) {
            if (!arg.includes(value)) {
                return false;
            }
        }
        return true;
    }
}
export class overlap {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue.some(r => arg.includes(r));
    }
}
export class len {
    static validate({ fieldName, arg, rowFieldValue = [], row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue.length == arg;
    }
}
export class hasKey {
    static validate({ fieldName, arg, rowFieldValue = [], row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        const keys = Object.keys(arg);
        for (let key of keys) {
            if (!_rowFieldValue[key]) {
                return false;
            }
        }
    }
}
export class hasAnyKeys {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return _rowFieldValue.some(key => !arg.includes(key));
    }
}
/**
 * @returns true when all of the given keys are in the data
 */
export class hasKeys {
    static validate(fieldObj, keys, row) {
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
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        return (_rowFieldValue == null) == arg;
    }
}
// object
export class objectIsnull {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let rowFieldValue;
        try {
            rowFieldValue = getDeep(row, fieldPath);
            if (rowFieldValue === undefined) {
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
        if (JSON.stringify(rowFieldValue) == '{}' && arg == false) {
            return true;
        }
        else if (rowFieldValue == null && arg == true) {
            return true;
        }
        else if (rowFieldValue == undefined) {
            return true;
        }
        return false;
    }
}
export class objectEq {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        if (JSON.stringify(_rowFieldValue = getDeep(row, fieldPath)) == '{}' && '{}' == JSON.stringify(arg)) {
            return true;
        }
        else if (arg == null && JSON.stringify(_rowFieldValue) == '{}') {
            return true;
        }
        else if (fieldPath) {
            if (arg == _rowFieldValue) {
                return true;
            }
        }
        return false;
    }
}
export class objectContains {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
export class ArrayFieldEq {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
        let _rowFieldValue;
        try {
            _rowFieldValue = getDeep(row, fieldPath);
            if (_rowFieldValue === undefined) {
                return false;
            }
        }
        catch (error) {
            return false;
        }
        if (JSON.stringify(_rowFieldValue) == '[]' && '[]' == JSON.stringify(arg)) {
            return true;
        }
        else if (arg == null && JSON.stringify(_rowFieldValue) == '[]') {
            return true;
        }
        else if (fieldPath) {
            if (arg == _rowFieldValue) {
                return true;
            }
        }
        return false;
    }
}
export class ArrayFieldContains {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
        try {
            for (const keys of arg) {
                if (!rowValue.includes(keys)) {
                    return false;
                }
            }
        }
        catch (error) {
            return false;
        }
        return true;
    }
}
export class ArrayFieldContains_by {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
        try {
            for (const keys of rowValue) {
                if (!arg.includes(keys)) {
                    return false;
                }
            }
        }
        catch (error) {
            return false;
        }
        return true;
    }
}
export class ArrayFieldContains_overlap {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
        try {
            for (const keys of arg) {
                if (rowValue.includes(keys)) {
                    return true;
                }
            }
        }
        catch (error) {
            return false;
        }
        return false;
    }
}
export class ArrayFieldContains_len {
    static validate({ fieldName, arg, row, fieldPath, customData }) {
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
        if (rowValue.length == arg) {
            return true;
        }
        return false;
    }
}
