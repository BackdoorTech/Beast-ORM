interface Trigger {
    callback: Function;
    SubscriptionName: string;
}
export declare class triggerSignal {
    static beforeInsertExist(Model: any): Trigger;
    static beforeInsert(instance: any): Promise<void>;
    static AfterInsertExist(Model: any): Trigger;
    static AfterInsert(instance: any): Promise<void>;
    static AfterDeleteExist(Model: any): Trigger;
    static AfterDelete(instance: string, { modelName, databaseName }: any): Promise<void>;
    static BeforeDeleteExist(Model: any): Trigger;
    static BeforeDelete(instance: string, { modelName, databaseName }: {
        modelName: any;
        databaseName: any;
    }): Promise<void>;
}
export {};
