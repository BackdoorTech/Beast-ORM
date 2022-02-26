import { field } from './field.js'

export class CharField extends field{
    maxLength:number | undefined
    minLength:number | undefined
    choices: any[] | undefined
    

    constructor(data?:{maxLength?:number, minLength?:number}) {
        super()
        Object.assign(this, data);
    }

}
