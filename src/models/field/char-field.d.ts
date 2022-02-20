import { variablesType } from './variables-type.js';
export declare class CharField extends variablesType {
    maxLength: number | undefined;
    minLength: number | undefined;
    choices: any[] | undefined;
    constructor(data?: {
        maxLength?: number;
        minLength?: number;
    });
}
