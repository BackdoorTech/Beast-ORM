export declare class _ModelMigrations {
    callback: any[];
    private isMigrationsReady;
    migrationsState(value: boolean): void;
    isReady(modelClassRepresentation: any): void;
    waitMigration(): Promise<unknown>;
}
export declare const ModelMigrations: _ModelMigrations;
