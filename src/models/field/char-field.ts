import { variablesType } from './variables-type.js';

export class CharField extends variablesType{
    maxLength:number | undefined
    minLength:number | undefined
    choices: any[] | undefined

    constructor(data?:{maxLength?:number, minLength?:number}) {
        super()
        Object.assign(this, data);
    }
    
}
