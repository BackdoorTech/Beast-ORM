export declare class FieldsInText {
    static textToOneLine(text: string): string;
    static getMatchAllField(oneLineString: string): string[];
    static getDeclarations(matchAllField: string[]): {};
    static FieldTypeAsStringToObject(FieldTypeAsString: string): any;
    static stringArgumentToObject(strFieldArguments: string): string;
    static getFieldsAndType(ModelInstance: any): {};
}
