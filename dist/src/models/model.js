import { CharField } from './field/char-field.js'

new CharField()
// import "reflect-metadata";
export var Model = /** @class */ (function () {
    function Model(obj_data) {
        //Instance Model Events
        //events are save, remove, reload, change
        this._events = {};
        
        Object.assign(this, obj_data || {});
    }

    Model.prototype.getModelName = function () {
        return this.static.getModelName();
    };
    
    //***************************************
    //*********** STATIC ********************
    //***************************************
    Model.getModelName = function () {
        if (!this.model_name)
            this.model_name = this.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1];
        return this.model_name;
    };

    return Model;
}());
