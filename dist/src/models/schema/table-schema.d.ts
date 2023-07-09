import { Model } from '../model.js';
import { TableSchema as FieldSchemaInterface } from '../register-modal.interface.js';
export declare class TableSchemaClass {
    config: FieldSchemaInterface;
    name: string;
    version: string;
    model: typeof Model;
    constructor({ store }: {
        store: FieldSchemaInterface;
    });
    setModel(modal: any): void;
    getModel(): typeof Model;
}
