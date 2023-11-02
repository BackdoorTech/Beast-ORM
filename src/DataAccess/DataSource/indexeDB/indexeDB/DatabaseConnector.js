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
exports.DatabaseConnector = void 0;
var connectionManagerHelper_js_1 = require("./resource/connectionManagerHelper.js");
var DatabaseConnector = /** @class */ (function () {
    function DatabaseConnector() {
    }
    DatabaseConnector.prototype.openDatabase = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                var request_1 = idbInstance.open(config.databaseName, config.version);
                request_1.onsuccess = function () {
                    resolve(request_1.result);
                };
                request_1.onerror = function (e) {
                    reject(e.target.error.name);
                };
                request_1.onupgradeneeded = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var db;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                db = e.target.result;
                                return [4 /*yield*/, this.runMigrations(db, config)];
                            case 1:
                                _a.sent();
                                db.onclose = function () { return __awaiter(_this, void 0, void 0, function () {
                                    var _a;
                                    return __generator(this, function (_b) {
                                        switch (_b.label) {
                                            case 0:
                                                _a = resolve;
                                                return [4 /*yield*/, this.openDatabase(config)];
                                            case 1:
                                                _a.apply(void 0, [_b.sent()]);
                                                return [2 /*return*/];
                                        }
                                    });
                                }); };
                                return [2 /*return*/];
                        }
                    });
                }); };
                request_1.onblocked = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        reject(e.target.error.name);
                        return [2 /*return*/];
                    });
                }); };
            }
            else {
                reject("IDBDatabase not supported inside webworker");
            }
        });
    };
    DatabaseConnector.prototype.migrate = function (config) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var idbInstance = indexedDB || self.indexedDB || self.mozIndexedDB || self.webkitIndexedDB || self.msIndexedDB;
            if (idbInstance) {
                var request = idbInstance.open(config.databaseName, config.version);
                request.onsuccess = function () {
                    resolve(false);
                };
                request.onerror = function (e) {
                    reject(e.target.error.name);
                };
                request.onupgradeneeded = function (e) { return __awaiter(_this, void 0, void 0, function () {
                    var db;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                db = e.target.result;
                                return [4 /*yield*/, this.runMigrations(db, config)];
                            case 1:
                                _a.sent();
                                db.close();
                                resolve(true);
                                return [2 /*return*/];
                        }
                    });
                }); };
            }
            else {
                reject("Failed to connect");
            }
        });
    };
    DatabaseConnector.prototype.runMigrations = function (db, config) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, storeSchema, ObjectStore, _b, _c, FieldSchema;
            return __generator(this, function (_d) {
                for (_i = 0, _a = config.table; _i < _a.length; _i++) {
                    storeSchema = _a[_i];
                    if (!connectionManagerHelper_js_1.connectionManagerHelper.storeExist(db, storeSchema.name)) {
                        ObjectStore = connectionManagerHelper_js_1.connectionManagerHelper.createObjectStore(db, storeSchema.id, storeSchema.name);
                        for (_b = 0, _c = storeSchema.fields; _b < _c.length; _b++) {
                            FieldSchema = _c[_b];
                            connectionManagerHelper_js_1.connectionManagerHelper.createColumn(ObjectStore, FieldSchema);
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    DatabaseConnector.prototype.closeDatabase = function (db) {
        db.close();
    };
    return DatabaseConnector;
}());
exports.DatabaseConnector = DatabaseConnector;
