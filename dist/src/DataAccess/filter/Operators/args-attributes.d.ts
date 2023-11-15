import { FieldSchema } from "../../../../_src/models/register-modal.interface.js";
import { ITableSchema } from "../../../BusinessLayer/_interface/interface.type.js";
import { AttributesMap, FieldKeys, FieldsMap } from "../../../BusinessLayer/fields/fields.type.js";
import { OperatorKeys } from "./object-operator.js";
export interface Field {
    fieldName: string;
    fieldPath: string;
    operation: OperatorKeys;
    operationArg?: string;
    operator: Function;
    fieldClassName: FieldKeys;
    customData?: Function;
}
export interface value {
    fieldName: string;
    fieldPath: string;
    operation: any;
    operationArg: any;
    operator: Function;
    fieldClassName: any;
    customData?: Function;
}
export declare class argsAttributes {
    private TableSchema;
    value: Array<FieldsMap<string, Field>>;
    schemeFields: AttributesMap<string, FieldSchema>;
    constructor(args: any, TableSchema: ITableSchema);
    private analyzeArgs;
    private detectClassName;
    private detectOperator;
    private argsPrettyTransform;
}
