export class DataParameters {
    getFilteredData(tableSchema, data) {
        const filteredData = {};
        for (const field of tableSchema.fieldNames) {
            filteredData[field] = data[field] || null;
            delete filteredData[tableSchema.id.keyPath];
        }
        return filteredData;
    }
    getFilteredDataWithId(tableSchema, data) {
        const filteredData = {};
        tableSchema.fieldNames.push(tableSchema.id.keyPath);
        for (const field of tableSchema.fieldNames) {
            filteredData[field] = data[field] || null;
        }
        return filteredData;
    }
    getFilteredDataOverlay(tableSchema, data) {
        const filteredData = {};
        for (const [key, value] of Object.entries(data)) {
            const found = tableSchema.fieldNames.find(x => x == key);
            if (found) {
                filteredData[value] = key;
            }
        }
        return filteredData;
    }
}
export const dataParameters = new DataParameters();
