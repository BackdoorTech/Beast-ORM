import { error, ok } from "../../../Utility/Either/index.js";
class emptyError extends Error {
}
class maxLengthError extends Error {
}
class minLengthError extends Error {
}
export class sizeError extends Error {
}
export class field {
    isNull(value) {
        if (value == undefined) {
            return true;
        }
        else if (value == null) {
            return true;
        }
        else if (value == '' && !Array.isArray(value)) {
            return true;
        }
        return false;
    }
    rules(field, value) {
        if (value == null || value == undefined) {
            return error(new emptyError());
        }
        if (field === null || field === void 0 ? void 0 : field.maxLength) {
            if (value.toString().length > field.maxLength) {
                return error(new maxLengthError());
            }
        }
        if (field === null || field === void 0 ? void 0 : field.minLength) {
            if (value.toString().length < field.minLength) {
                return error(new minLengthError());
            }
        }
        if (field === null || field === void 0 ? void 0 : field.foreignKey) {
        }
        return ok(true);
    }
    valid(e) {
        return " ";
    }
}
