declare class getFieldsFromString {
    static textToOneLine(text: string): string;
    static matchAllField(oneLineString: any): any;
    getDeclarations(matchAllField: any, oneLineString: any): void;
    static getColumns(ModelInstance: any): void;
}
