import { indexedDB } from './indexedDb/indexedb.js';
onmessage = async (oEvent) => {
    const { TableName, DatabaseName, queryId, action, arg } = oEvent.data;
    indexedDB.requestHandler(TableName, DatabaseName, queryId)[action](arg).then((result) => {
        // console.log('result', result)
        // postMessage(result)
    }, (error) => {
        console.log('error', error);
    });
};
