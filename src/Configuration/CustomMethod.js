"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customMethod = void 0;
var CustomMethod = /** @class */ (function () {
    function CustomMethod() {
    }
    CustomMethod.prototype.add = function (Model, methodName, f) {
        // Add a static method to the model for accessing the table schema.
        Model[methodName] = f;
        Object.defineProperty(Model.prototype, methodName, f);
    };
    CustomMethod.prototype.addStaticMethod = function (Model, methodName, f) {
        // Add a static method to the model for accessing the table schema.
        Model[methodName] = f;
        Object.defineProperty(Model.prototype, methodName, f);
    };
    return CustomMethod;
}());
exports.customMethod = new CustomMethod();
