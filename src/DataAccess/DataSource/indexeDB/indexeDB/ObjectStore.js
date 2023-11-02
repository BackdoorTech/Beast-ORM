"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectStore = void 0;
var ObjectStore = /** @class */ (function () {
    function ObjectStore(tableSchema) {
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
        this.schema = tableSchema;
    }
    ObjectStore.prototype.enqueueTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        transaction.finishRequest = function () {
                            resolve(true);
                        };
                        _this.transactionQueue.push(transaction);
                        if (!_this.isTransactionInProgress) {
                            _this.processTransactionQueue();
                        }
                    })];
            });
        });
    };
    ObjectStore.prototype.processTransactionQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var loop;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.isTransactionInProgress) {
                            return [2 /*return*/];
                        }
                        this.isTransactionInProgress = true;
                        loop = function () { return __awaiter(_this, void 0, void 0, function () {
                            var nextTransaction, error_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        nextTransaction = this.transactionQueue.shift();
                                        if (!nextTransaction) return [3 /*break*/, 6];
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, 4, 6]);
                                        return [4 /*yield*/, this.executeTransaction(nextTransaction)];
                                    case 2:
                                        _a.sent();
                                        return [3 /*break*/, 6];
                                    case 3:
                                        error_1 = _a.sent();
                                        console.error('Transaction failed:', error_1);
                                        return [3 /*break*/, 6];
                                    case 4: return [4 /*yield*/, loop()];
                                    case 5:
                                        _a.sent();
                                        return [7 /*endfinally*/];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, loop()];
                    case 1:
                        _a.sent();
                        this.isTransactionInProgress = false;
                        this.commitTransaction();
                        return [2 /*return*/];
                }
            });
        });
    };
    ObjectStore.prototype.executeTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var operation, data, onsuccess, onerror, index, finishRequest, objectStore, request;
            var _this = this;
            return __generator(this, function (_a) {
                operation = transaction.operation, data = transaction.data, onsuccess = transaction.onsuccess, onerror = transaction.onerror, index = transaction.index, finishRequest = transaction.finishRequest;
                this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
                objectStore = this.txInstance.IDBTransaction.objectStore(this.schema.name);
                request = objectStore[operation](data);
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _this = this;
                        return __generator(this, function (_a) {
                            request.onsuccess = function () { return __awaiter(_this, void 0, void 0, function () {
                                var data;
                                return __generator(this, function (_a) {
                                    data = { data: request.result, index: index };
                                    resolve(data);
                                    onsuccess(data);
                                    finishRequest();
                                    return [2 /*return*/];
                                });
                            }); };
                            request.onerror = function (error) {
                                _this.commitTransaction();
                                _this.createTransaction();
                                reject(error);
                                onerror();
                                finishRequest();
                            };
                            return [2 /*return*/];
                        });
                    }); })];
            });
        });
    };
    ObjectStore.prototype.commitTransaction = function () {
        try {
            this.txInstance.IDBTransaction.commit();
            return true;
        }
        catch (error) {
            return false;
        }
    };
    ObjectStore.prototype.createTransaction = function () {
        this.txInstance = {};
        this.txInstance.IDBTransaction = this.db.transaction(this.schema.name, "readwrite");
    };
    ObjectStore.prototype.closeTransaction = function () {
        delete this.txInstance.IDBTransaction;
    };
    ObjectStore.prototype.hasActiveTransaction = function () {
        var _a;
        return (_a = this.txInstance) === null || _a === void 0 ? void 0 : _a.IDBTransaction;
    };
    return ObjectStore;
}());
exports.ObjectStore = ObjectStore;
