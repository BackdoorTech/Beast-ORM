import { CharField } from './field/char-field.js'
import { getFields } from './get-model-fields-from-string/get-model-field-from-text.js'

new CharField()
// import "reflect-metadata";

export class Model  {
    static model_name: any;
    model_name: any
    
    constructor(obj_data) {
        Object.assign(this, obj_data || {});
    }

    getModelName () {
        return this.model_name = Model.getModelName();
    }

    static getModelName() {
        if (!this.model_name)
        this.model_name = this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
        return this.model_name;
    }
}