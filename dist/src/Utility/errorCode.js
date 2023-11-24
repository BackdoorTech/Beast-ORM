export var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["Transaction"] = 0] = "Transaction";
    ErrorCode[ErrorCode["UniquenessField"] = 1] = "UniquenessField";
    // Worker = 1
    // BusinessLayer = 2
    // FormValidation = 3
})(ErrorCode || (ErrorCode = {}));
