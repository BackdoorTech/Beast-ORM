import { Model } from "../Presentation/Api.js";
export interface IRegister {
    databaseName: string;
    version: number;
    type: 'indexedDB' | 'localStorage';
    models: typeof Model[];
    /**
     * @description restore values from localStorage for LocalStorage Models
     */
    restore?: boolean;
    ignoreFieldsStartWidth?: string[];
}
export interface IRegisterTransform {
    databaseName: string;
    version: number;
    type: 'indexedDB' | 'localStorage';
    models: {
        class: typeof Model[];
        name: string;
    }[];
    /**
     * @description restore values from localStorage for LocalStorage Models
     */
    restore?: boolean;
    ignoreFieldsStartWidth?: string[];
}
