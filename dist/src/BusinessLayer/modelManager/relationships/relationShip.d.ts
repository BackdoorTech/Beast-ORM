import { Model } from "../../../Presentation/Api";
import { IRegister } from "../../beastOrm.type";
export declare class RelationShip {
    add(register: IRegister): void;
    static addMethodForeignKey(foreignKeyModel: typeof Model<any>, foreignKeyFieldName: string, currentModel: typeof Model<any>): void;
}
export declare const relationShip: RelationShip;
