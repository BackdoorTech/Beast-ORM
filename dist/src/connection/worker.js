import { indexedDB } from './indexedDb/indexedb.js';
onmessage = async (oEvent) => {
    const { TableSchema, DBconfig, queryId, action, arg } = oEvent.data;
    const result = await indexedDB.requestHandler(TableSchema, DBconfig, queryId)[action](arg);
    postMessage(result);
};
