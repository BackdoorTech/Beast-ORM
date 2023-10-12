import { LocalStorage } from "./model.js";
import { params } from './signal.interface.js';
export declare const rewrite: {
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
