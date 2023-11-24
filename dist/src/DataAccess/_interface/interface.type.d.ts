import { ErrorCode } from "../../Utility/errorCode.js";
export declare class TransactionInfo {
    hasChangeDb: boolean;
    operationNum: number;
    constructor();
}
export declare class TransactionAbortion extends Error {
    errorCode: ErrorCode;
    cause: ConstraintError;
    constructor();
    setCause(cause: ConstraintError): void;
}
export declare class ConstraintError {
    code: ErrorCode;
    message: string;
    name: string;
    constructor(data: any);
    tips(): void;
}
