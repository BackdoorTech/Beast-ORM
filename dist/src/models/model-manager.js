var _a;
import { DBSwitch } from '../connection/dbSwtich.js';
export class ModelManager {
    constructor() {
        this.obj = (config) => {
            return {
                create: (arg) => {
                    return ModelManager.obj(config).create(arg);
                }
            };
        };
    }
}
_a = ModelManager;
ModelManager.obj = (config) => {
    return {
        create: async (arg) => {
            return await DBSwitch.requestHandler('Person', config, 'indexeddb', 'insert', arg);
        }
    };
};
