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
exports.MigrationsModel = void 0;
var indexedDBFIFO = /** @class */ (function () {
    function indexedDBFIFO(dbName) {
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
        this.pending = 0;
        this.dbName = dbName;
    }
    indexedDBFIFO.prototype.openDatabase = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.db) {
                            resolve(_this.db);
                        }
                        else {
                            var request_1 = indexedDB.open(_this.dbName, 2);
                            request_1.onsuccess = function () {
                                _this.db = request_1.result;
                                _this.txInstance = _this.db.transaction(["database"], "readwrite");
                                resolve(_this.db);
                            };
                            request_1.onupgradeneeded = function (event) {
                                var db = event.target.result;
                                db.createObjectStore("database", { keyPath: "MyID", autoIncrement: true });
                                db.close();
                                resolve(_this.openDatabase());
                            };
                            request_1.onerror = function (error) {
                                reject(error);
                            };
                        }
                    })];
            });
        });
    };
    indexedDBFIFO.prototype.processTransactionQueue = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, loop;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.isTransactionInProgress) {
                            return [2 /*return*/];
                        }
                        _a = this;
                        return [4 /*yield*/, this.openDatabase()];
                    case 1:
                        _a.db = _b.sent();
                        loop = function () {
                            var _a;
                            if (_this.transactionQueue.length > 0) {
                                _this.isTransactionInProgress = true;
                                var nextTransaction = _this.transactionQueue.shift();
                                _this.pending++;
                                _this.executeTransaction(nextTransaction)
                                    .then(function () { })
                                    .catch(function (error) { }).finally(function () {
                                    _this.pending--;
                                    loop();
                                });
                            }
                            else {
                                _this.isTransactionInProgress = false;
                                if (_this.db) {
                                    if (_this.pending == 0) {
                                        (_a = (_this.txInstance)) === null || _a === void 0 ? void 0 : _a.commit();
                                        _this.db.close();
                                        _this.db = null;
                                        _this.txInstance = null;
                                    }
                                }
                            }
                        };
                        loop();
                        return [2 /*return*/];
                }
            });
        });
    };
    indexedDBFIFO.prototype.executeTransaction = function (transaction) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var objectStore = transaction.storeName;
                        var mode = transaction.mode;
                        var operation = transaction.operation;
                        var request = _this.txInstance.objectStore("database")[operation](transaction.data);
                        request.onsuccess = function () {
                            resolve(request.result);
                            transaction.callback(request.result);
                        };
                        request.onerror = function (error) {
                            reject(error);
                        };
                    })];
            });
        });
    };
    indexedDBFIFO.prototype.enqueueTransaction = function (_a) {
        var storeName = _a.storeName, mode = _a.mode, operation = _a.operation, data = _a.data, callback = _a.callback;
        return __awaiter(this, void 0, void 0, function () {
            var transaction;
            return __generator(this, function (_b) {
                transaction = { storeName: storeName, mode: mode, operation: operation, data: data, callback: callback };
                this.transactionQueue.push(transaction);
                if (!this.isTransactionInProgress) {
                    this.processTransactionQueue();
                }
                return [2 /*return*/];
            });
        });
    };
    indexedDBFIFO.prototype.insert = function (storeName, data, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.enqueueTransaction({ storeName: storeName, mode: 'readwrite', operation: 'add', data: data, callback: callback })];
            });
        });
    };
    indexedDBFIFO.prototype.get = function (storeName, key, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.enqueueTransaction({ storeName: storeName, mode: 'readwrite', operation: 'get', data: key, callback: callback })];
            });
        });
    };
    indexedDBFIFO.prototype.getAll = function (storeName, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.enqueueTransaction({ storeName: storeName, mode: 'readonly', operation: 'getAll', callback: callback, data: null })];
            });
        });
    };
    return indexedDBFIFO;
}());
var db = new indexedDBFIFO("Migrations");
var MigrationsModel = /** @class */ (function () {
    function MigrationsModel(data) {
        if (data === void 0) { data = {}; }
        this.migrations = [];
        Object.assign(this, data);
    }
    MigrationsModel.prototype.DB = function () { return MigrationsModel.DB(); };
    MigrationsModel.DB = function () { return db; };
    MigrationsModel.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.DB().insert("objectStore", data, function (data) {
                            resolve(data);
                        });
                    })];
            });
        });
    };
    MigrationsModel.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.DB().insert("objectStore", _this, function (data) {
                            resolve(data);
                        });
                    })];
            });
        });
    };
    MigrationsModel.get = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.DB().get("objectStore", key, function (data) {
                            resolve(data);
                        });
                    })];
            });
        });
    };
    MigrationsModel.getAll = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.DB().getAll("objectStore", function (data) {
                resolve(data);
            });
        });
    };
    return MigrationsModel;
}());
exports.MigrationsModel = MigrationsModel;
