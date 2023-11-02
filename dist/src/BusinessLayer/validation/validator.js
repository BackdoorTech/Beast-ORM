class validator {
    validateFromSchema(tableSchema, data) {
        const requiredFieldNames = this.requiredFields(tableSchema);
        for (const fieldName of requiredFieldNames) {
            if (!data.hasOwnProperty(fieldName)) {
                return false;
            }
        }
        return true;
    }
    requiredFields(tableSchema) {
        const fieldNames = [];
        for (const field of tableSchema.fields) {
            if (!field.blank) {
                fieldNames.push(field.name);
            }
        }
        return fieldNames;
    }
}
export {};
