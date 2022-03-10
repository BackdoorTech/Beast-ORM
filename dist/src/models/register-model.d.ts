import { Model } from './model.js';
interface register {
    databaseName: string;
    version: number;
    type: 'indexeddb' | 'memory';
    models: typeof Model[];
}
export declare const models: {};
export declare class registerModel {
    static register(entries: register): Promise<void>;
}
export {};
