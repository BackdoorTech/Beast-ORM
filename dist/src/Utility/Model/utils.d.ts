import { ITableSchema } from "../../BusinessLayer/_interface/interface.type";
import { Model } from "../../Presentation/Api.js";
export declare function argHasId(TableSchema: ITableSchema, args: Object): Boolean;
export declare function getArgId(TableSchema: ITableSchema, args: Object): Boolean;
export declare function getIdObject(TableSchema: ITableSchema, args: Object): Object;
export declare function getArgIdWithT(model: typeof Model<any> | Model<any>, args: Object): string | number;
export declare function getIdObjectWithT(model: typeof Model<any> | Model<any>, args: Object): Object;
export declare function equalModels(a: typeof Model<any>, b: typeof Model<any>): boolean;
