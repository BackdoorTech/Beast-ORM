import { IRegisterKeyValueStore } from "../beastOrm.type";
declare class BeastORM {
    registerKeyValueStore: (register: IRegisterKeyValueStore) => void;
}
export declare const ORM: BeastORM;
export {};
