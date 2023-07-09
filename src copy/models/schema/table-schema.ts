import { Model } from '../model.js';
import { TableSchema as FieldSchemaInterface } from '../register-modal.interface.js';

export class TableSchemaClass {

    config: FieldSchemaInterface
    name = ''
    version = ''
    model: typeof Model

    constructor({store}: {store: FieldSchemaInterface}) {
        this.name = store.name
        this.config = store
    }


    setModel(modal) {
        this.model = modal
    }
    getModel () {
        return this.model
    }
}