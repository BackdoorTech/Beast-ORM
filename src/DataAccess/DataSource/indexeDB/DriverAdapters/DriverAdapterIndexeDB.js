"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.IndexedDBStrategy = void 0;
var DatabaseManager_js_1 = require("../indexeDB/DatabaseManager.js");
// IndexedDB strategy
var IndexedDBStrategy = /** @class */ (function () {
    function IndexedDBStrategy(databaseName) {
        this.databaseName = databaseName;
    }
    IndexedDBStrategy.prototype.openDatabase = function () {
        var _this = this;
        return function (callbacks) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        }); };
    };
    IndexedDBStrategy.prototype.delete = function (table, data) {
        var _this = this;
        // Implement IndexedDB insert here
        return function (callbacks) { return __awaiter(_this, void 0, void 0, function () {
            var ObjectStore, _i, data_1, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseManager_js_1.databaseManager.getDb(this.databaseName)
                            .executeOnObjectStore(this.tableName)];
                    case 1:
                        ObjectStore = _a.sent();
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            item = data_1[_i];
                            ObjectStore.enqueueTransaction(__assign({ operation: "delete", item: item }, callbacks));
                        }
                        return [2 /*return*/];
                }
            });
        }); };
    };
    IndexedDBStrategy.prototype.insert = function (table, data) {
        var _this = this;
        // Implement IndexedDB insert here
        return function (callbacks) { return __awaiter(_this, void 0, void 0, function () {
            var ObjectStore, index, _i, data_2, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseManager_js_1.databaseManager.getDb(this.databaseName)
                            .executeOnObjectStore(table)];
                    case 1:
                        ObjectStore = _a.sent();
                        index = 0;
                        _i = 0, data_2 = data;
                        _a.label = 2;
                    case 2:
                        if (!(_i < data_2.length)) return [3 /*break*/, 5];
                        item = data_2[_i];
                        return [4 /*yield*/, ObjectStore.enqueueTransaction(__assign({ operation: "add", index: index, data: item }, callbacks))];
                    case 3:
                        _a.sent();
                        index++;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        callbacks.done();
                        return [2 /*return*/];
                }
            });
        }); };
    };
    IndexedDBStrategy.prototype.select = function (table, data) {
        var _this = this;
        // Implement IndexedDB select here
        return function (callbacks) { return __awaiter(_this, void 0, void 0, function () {
            var ObjectStore, _callbacks;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, DatabaseManager_js_1.databaseManager.getDb(this.databaseName)
                            .executeOnObjectStore(this.tableName)];
                    case 1:
                        ObjectStore = _a.sent();
                        _callbacks = {
                            onsuccess: function (completeList) {
                            },
                            onerror: function () { }
                        };
                        ObjectStore.enqueueTransaction({ operation: "all", item: null, callbacks: _callbacks });
                        return [2 /*return*/];
                }
            });
        }); };
    };
    IndexedDBStrategy.prototype.migrate = function (migrate) {
        var _this = this;
        return function (_a) {
            var onerror = _a.onerror, onsuccess = _a.onsuccess;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    DatabaseManager_js_1.databaseManager
                        .getDb(migrate.databaseName)
                        .migrate();
                    return [2 /*return*/];
                });
            });
        };
    };
    IndexedDBStrategy.prototype.prepare = function (migrate) {
        var _this = this;
        return function (_a) {
            var onerror = _a.onerror, onsuccess = _a.onsuccess, done = _a.done;
            return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, DatabaseManager_js_1.databaseManager.prepare(migrate)];
                        case 1:
                            _b.sent();
                            done();
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
    return IndexedDBStrategy;
}());
exports.IndexedDBStrategy = IndexedDBStrategy;
