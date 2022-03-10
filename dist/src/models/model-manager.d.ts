import { DatabaseSchema } from './register-modal.interface.js';
export declare class ModelManager {
    constructor();
    private obj;
    static obj: (config: DatabaseSchema) => {
        create: (arg: any) => Promise<any>;
    };
}
