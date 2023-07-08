import { LocalStorage } from "./model.js";
interface params {
    key: string;
    localStorage: typeof localStorage;
    instance: typeof LocalStorage[];
    dataToSave: any;
}
export declare const signals: {
    rewriteGet: {
        connect(callback: (params: params) => void, models: (typeof LocalStorage)[]): void;
    };
    rewriteSave: {
        connect(callback: (params: params) => void, models: (typeof LocalStorage)[]): void;
    };
    rewriteDelete: {
        connect(callback: (params: params) => void, models: (typeof LocalStorage)[]): void;
    };
    hasRewriteGet(ModalName: string): boolean;
    hasRewriteSave(ModalName: string): boolean;
    hasRewriteDelete(ModalName: string): boolean;
};
export declare const signalExecutor: {
    rewriteGet(ModalName: string, instance: any): any;
    rewriteSave(ModalName: string, instance: any, dataToSave: any): any;
    rewriteDelete(ModalName: string, instance: any): any;
};
export {};
