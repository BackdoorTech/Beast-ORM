import { ErrorCode } from "../../Utility/errorCode.js";
export class TransactionInfo {
    constructor() {
        this.hasChangeDb = false;
        this.operationNum = 0;
    }
}
export class TransactionAbortion extends Error {
    constructor() {
        super();
        this.errorCode = ErrorCode.Transaction;
    }
    setCause(cause) {
        this.cause = cause;
    }
}
export class ConstraintError {
    constructor(data) {
        this.code = ErrorCode.UniquenessField;
        Object.assign(this, data);
    }
    tips() { }
}
