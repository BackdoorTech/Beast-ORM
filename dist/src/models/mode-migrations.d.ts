export declare class _ModelMigrations {
    callback: {
        [dbName: string]: Function[];
    };
    migrated: {
        [dbName: string]: boolean;
    };
    prepare(databaseName: any): void;
    migrationsState(databaseName: string, value: boolean): void;
    isReady(modelClassRepresentation: any): void;
    waitMigration(databaseName: string): Promise<unknown>;
}
export declare const ModelMigrations: _ModelMigrations;
