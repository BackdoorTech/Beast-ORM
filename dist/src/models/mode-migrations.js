export class _ModelMigrations {
    constructor() {
        this.callback = {};
        this.migrated = {};
    }
    prepare(databaseName) {
        this.callback[databaseName] = [];
    }
    migrationsState(databaseName, value) {
        this.migrated[databaseName] = value;
        if (this.migrated[databaseName]) {
            this.callback[databaseName].forEach((callback, index, object) => {
                callback();
            });
        }
    }
    isReady(modelClassRepresentation) {
        // const classInstance: typeof models.Model = new modelClassRepresentation()
    }
    async waitMigration(databaseName) {
        return new Promise((resolve, reject) => {
            if (!this.migrated[databaseName]) {
                this.callback[databaseName].push(() => {
                    resolve('ready');
                });
            }
            else {
                resolve('ready');
            }
        });
    }
}
export const ModelMigrations = new _ModelMigrations();
