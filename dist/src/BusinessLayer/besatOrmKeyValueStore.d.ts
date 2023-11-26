import { KeyValueModel } from "../Presentation/Api.js";
import { IRegisterKeyValueStore } from "./beastOrm.type.js";
interface HiddenMethods {
    GET(KeyValue: Model): Object;
    DELETE(KeyValue: Model): any;
    UPDATE(dataToSave: any, KeyValue: Model): any;
}
type Model = typeof KeyValueModel & HiddenMethods;
declare class BeastORMKeyValueStore {
    registerKeyValueStore: (register: IRegisterKeyValueStore) => void;
    executeUpdate(dataToSave: any, model: Model): void;
    executeSelect(model: Model): Object;
    executeDelete(model: Model): void;
}
export declare const beastORMKeyValueStore: BeastORMKeyValueStore;
export {};
