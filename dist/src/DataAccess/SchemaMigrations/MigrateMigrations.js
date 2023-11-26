export class MigrateMigrations {
    async prepareMigrate(Migrations, DatabaseStrategy) {
        return new Promise((resolve, reject) => {
            const request = DatabaseStrategy.prepare(Migrations)({
                onerror: () => { },
                onsuccess: () => { },
                done: () => {
                    resolve(true);
                }
            });
        });
    }
    async migrate(Migrations, DatabaseStrategy) {
        return new Promise((resolve, reject) => {
            DatabaseStrategy.migrate(Migrations)({
                onerror: () => { },
                onsuccess: () => { },
                done() {
                    resolve(true);
                }
            });
        });
    }
}
export const migrateMigrations = new MigrateMigrations();
