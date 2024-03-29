import { AttributesMap, FieldKeys, FieldsMap } from "../../models/field/fields.interface.js";
import { OperatorKeys } from "./object-operator.js";
import { TableSchema, FieldSchema } from '../../models/register-modal.interface.js';
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
    constructor(args: any, TableSchema: TableSchema);
    private analyzeArgs;
    private detectClassName;
    private detectOperator;
    private argsPrettyTransform;
}
