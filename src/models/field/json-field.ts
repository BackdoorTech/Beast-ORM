import { variablesType } from './variables-type.js';

export class JsonField extends variablesType{

    choices: any[] | undefined

    constructor(data?:{maxLength?:number, minLength?:number}) {
        super()
        Object.assign(this, data);
    }

}