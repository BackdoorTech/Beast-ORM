import { IndexedDBStrategy } from "../DriverAdapterIndexedDB.js";
let Strategy;
function sendMessage(data) {
    postMessage(data);
}
function generateCallbacks(UUID) {
    return {
        onsuccess: (data) => { sendMessage({ callbackName: 'onsuccess', UUID, data }); },
        onerror: (data) => { sendMessage({ callbackName: 'onerror', UUID, data }); },
        notFound: (data) => { sendMessage({ callbackName: 'notFound', UUID, data }); },
        done: (data) => { sendMessage({ callbackName: 'done', UUID, data }); },
        stream: (data) => { sendMessage({ callbackName: 'stream', UUID, data }); }
    };
}
let onmessageHandler = (oEvent) => { };
function onmessageHandlerFirstMessage(oEvent) {
    const { databaseName } = oEvent.data;
    Strategy = new IndexedDBStrategy(databaseName);
    onmessageHandler = mainOnmessageHandler;
}
function mainOnmessageHandler(oEvent) {
    const { UUID, methodName, data } = oEvent.data;
    const callbacks = generateCallbacks(UUID);
    Strategy[methodName](data)(callbacks);
}
onmessageHandler = onmessageHandlerFirstMessage;
onmessage = async (oEvent) => {
    onmessageHandler(oEvent);
};
