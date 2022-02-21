// import "reflect-metadata";
export class Model {
    constructor(objData) {
        Object.assign(this, objData || {});
    }
    getModelName() {
        return this.modelName = Model.getModelName();
    }
    static getModelName() {
        if (!this.modelName)
            this.modelName = this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
        return this.modelName;
    }
}
