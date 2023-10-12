export class field {
    get field() {
        return true;
    }
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
        if (field === null || field === void 0 ? void 0 : field.maxLength) {
            if (value.toString().length > field.maxLength) {
                return false;
            }
        }
        if (field === null || field === void 0 ? void 0 : field.minLength) {
            if (value.toString().length < field.minLength) {
                return false;
            }
        }
        if (field === null || field === void 0 ? void 0 : field.foreignKey) {
        }
        return true;
    }
}
