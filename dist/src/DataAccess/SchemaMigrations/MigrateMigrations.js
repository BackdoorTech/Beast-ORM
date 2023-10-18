export class MigrateMigrations {
    async prepareMigrate(Migrations, DatabaseStrategy) {
        return new Promise((resolve, reject) => {
            DatabaseStrategy.prepare(Migrations)({
                done: () => {
                    resolve(true);
                }
            });
        });
    }
    async migrate(Migrations, DatabaseStrategy) {
        return new Promise((resolve, reject) => {
            DatabaseStrategy.migrate(Migrations)({
                done() {
                    resolve(true);
                }
            });
        });
    }
}
export const migrateMigrations = new MigrateMigrations();
