import { Model } from './model.js';
interface register {
    databaseName: string;
    version: number;
    type: 'indexeddb' | 'memory';
    models: typeof Model[];
}
export declare class registerModel {
    static register(entries: register): void;
}
export {};
