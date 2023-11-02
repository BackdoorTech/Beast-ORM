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
exports.DatabaseService = void 0;
var DatabaseConnector_js_1 = require("./DatabaseConnector.js");
var ObjectStore_js_1 = require("./ObjectStore.js");
var DatabaseService = /** @class */ (function () {
    function DatabaseService(schema) {
        var _this = this;
        this.db = null;
        this.transactionQueue = [];
        this.isTransactionInProgress = false;
        this.objectStore = {};
        this.executingTransaction = {};
        this.transactionFinish = function (TableName) {
            delete _this.executingTransaction[TableName];
            if (Object.keys(_this.executingTransaction).length == 0) {
                _this.db.close();
                delete _this.db;
            }
        };
        this.schema = schema;
        this.connector = new DatabaseConnector_js_1.DatabaseConnector();
        for (var _i = 0, _a = schema.table; _i < _a.length; _i++) {
            var tableSchema = _a[_i];
            this.objectStore[tableSchema.name] = new ObjectStore_js_1.ObjectStore(tableSchema);
        }
    }
    DatabaseService.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, this.connector.openDatabase(this.schema)];
                    case 1:
                        _a.db = _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.prototype.migrate = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connector.migrate(this.schema)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    DatabaseService.prototype.hasConnectionToDatabase = function () {
        return this.db;
    };
    DatabaseService.prototype.executeOnObjectStore = function (objectStoreName) {
        return __awaiter(this, void 0, void 0, function () {
            var objectStore;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.hasConnectionToDatabase()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        objectStore = this.objectStore[objectStoreName];
                        if (!objectStore.hasActiveTransaction()) {
                            objectStore.db = this.db;
                            objectStore.createTransaction();
                            console.log("create transaction");
                        }
                        console.log("objectStore", objectStore);
                        this.executingTransaction[objectStoreName] = true;
                        return [2 /*return*/, objectStore];
                }
            });
        });
    };
    return DatabaseService;
}());
exports.DatabaseService = DatabaseService;
