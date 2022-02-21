import { CharField } from './field/char-field.js'
import { getFields } from './get-model-fields-from-string/get-model-field-from-text.js'


// import "reflect-metadata";

export class Model  {
    static modelName: any;
    modelName: any

    constructor(objData:any) {
        Object.assign(this, objData || {});
    }

    getModelName () {
        return this.modelName = Model.getModelName();
    }

    static getModelName() {
        if (!this.modelName)
        this.modelName = this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
        return this.modelName;
    }
}