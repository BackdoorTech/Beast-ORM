import { LocalStorage } from "./model";

export interface params {
    key: string,  
    localStorage: typeof localStorage, 
    instance: typeof LocalStorage[],
    dataToSave: any
}

