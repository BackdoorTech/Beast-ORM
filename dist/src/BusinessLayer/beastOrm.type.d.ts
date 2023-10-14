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
