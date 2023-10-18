// postMessage("I\'m working before postMessage(\'ali\').");
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDB';
const Strategy = new IndexedDBStrategy();
onmessage = async (oEvent) => {
    const method = "insert";
    let params = ["table", {}];
    const fun = Strategy[method];
    const onsuccess = () => { };
    const onerror = () => { };
    const done = () => { };
    fun(...params)(onsuccess, onerror, done);
};
