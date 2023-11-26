class ObjectEqual {
    same(Model, data) {
        return JSON.stringify(Model) == JSON.stringify(data);
    }
}
export const objectEqual = new ObjectEqual();
