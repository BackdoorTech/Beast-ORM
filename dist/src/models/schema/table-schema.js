export class TableSchemaClass {
    constructor({ store }) {
        this.name = '';
        this.version = '';
        this.name = store.name;
        this.config = store;
    }
    setModel(modal) {
        this.model = modal;
    }
    getModel() {
        return this.model;
    }
}
