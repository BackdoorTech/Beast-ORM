export class _ModelMigrations {
    constructor() {
        this.callback = [];
        this.isMigrationsReady = false;
    }
    migrationsState(value) {
        this.isMigrationsReady = value;
        if (this.isMigrationsReady) {
            this.callback.forEach((item, index, object) => {
                item();
            });
        }
    }
    isReady(modelClassRepresentation) {
        // const classInstance: typeof models.Model = new modelClassRepresentation()
    }
    async waitMigration() {
        return new Promise((resolve, reject) => {
            if (!this.isMigrationsReady) {
                this.callback.push(() => {
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
