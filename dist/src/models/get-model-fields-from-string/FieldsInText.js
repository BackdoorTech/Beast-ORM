import * as Fields from './../field/fields.js';
export class FieldsInText {
    // this method was created to be private
    static textToOneLine(text) {
        return text.replace(/\r/g, "").replace(/\n/g, "");
    }
    // this method was created to be private
    static getMatchAllField(oneLineString) {
        let fields = oneLineString.toString()
            .match(/this.(\w*\s*)=.+([)];)/g).map((e) => {
            return e.split(';');
        })[0] || [];
        fields.map((e) => {
            return e.split(';');
        });
        fields = fields.slice(0, -1);
        return fields;
    }
    // this method was created to be private
    static getDeclarations(matchAllField) {
        const declarations = {};
        matchAllField.forEach((declaration) => {
            declaration = declaration
                .replace('this.', '') // remove this. keyword
                .replace(/\s*=\s*/, '='); // remove space after and before the equal. Ex: "this.username  =   CharField({ maxLength: 90 })" output "this.username=CharField({ maxLength: 90 })"
            let [FieldName, FieldTypeAsString] = declaration.split('=');
            FieldName = FieldName.trim();
            declarations[FieldName] = this.FieldTypeAsStringToObject(FieldTypeAsString);
        });
        return declarations;
    }
    // this method was created to be private
    static FieldTypeAsStringToObject(FieldTypeAsString) {
        var _a;
        const FieldsType = Object.keys(Fields).find((key) => {
            return FieldTypeAsString.startsWith(key);
        });
        const Field = Fields[FieldsType];
        const regex = new RegExp(`${FieldsType}[(][{]`);
        let FieldArguments;
        // has argument
        if (((_a = FieldTypeAsString.match(regex)) === null || _a === void 0 ? void 0 : _a.length) == 1) {
            FieldArguments = FieldTypeAsString.replace(regex, '').slice(0, -1);
            FieldArguments = '{' + FieldArguments;
            let args = this.stringArgumentToObject(FieldArguments);
            args = JSON.parse(args);
            return Field(args);
        }
        return Field();
    }
    // this method was created to be private
    static stringArgumentToObject(strFieldArguments) {
        strFieldArguments.replace('{ ', '').split(', ').map((e) => {
            return e.split(':')[0];
        }).forEach((e) => {
            strFieldArguments = strFieldArguments
                .replace('{ ' + e + ':', `{ "${e}":`)
                .replace(', ' + e + ':', `, "${e}":`);
        });
        return strFieldArguments;
    }
    static getFieldsAndType(ModelInstance) {
        const oneLineText = this.textToOneLine(ModelInstance.toString());
        const matchFields = this.getMatchAllField(oneLineText);
        const declaration = this.getDeclarations(matchFields);
        return declaration;
    }
}
