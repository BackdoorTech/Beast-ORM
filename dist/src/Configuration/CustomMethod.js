class CustomMethod {
    add(Model, methodName, value) {
        // Add a static method to the model for accessing the table schema.
        Model[methodName] = function () {
            return value;
        };
        Model.prototype[methodName] = function () {
            return value;
        };
    }
    addStaticMethodNowrap(Model, methodName, func) {
        // Add a static method to the model for accessing the table schema.
        Model[methodName] = func;
        Model.prototype[methodName] = func;
    }
}
export const customMethod = new CustomMethod();
