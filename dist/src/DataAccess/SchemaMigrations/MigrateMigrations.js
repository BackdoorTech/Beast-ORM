export class MigrateMigrations {
    migrate(Migrations, DatabaseStrategy) {
        DatabaseStrategy.migrate(Migrations);
    }
}
export const migrateMigrations = new MigrateMigrations();
