class CustomMethod {
    add(Model, methodName, f) {
        // Add a static method to the model for accessing the table schema.
        Model[methodName] = f;
        Object.defineProperty(Model.prototype, methodName, f);
    }
    addStaticMethod(Model, methodName, f) {
        // Add a static method to the model for accessing the table schema.
        Model[methodName] = f;
        // Object.defineProperty(Model.prototype, methodName, f)
    }
}
export const customMethod = new CustomMethod();
