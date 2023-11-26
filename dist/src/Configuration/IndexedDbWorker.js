import { IndexedDBWorkerStrategy } from "../DataAccess/DataSource/indexeDB/DriverAdapters/DriverAdapterIndexeDBWebWorker.js";
import { setStrategy } from "../DataAccess/DriverAdapters/DriverAdapter.js";
setStrategy(IndexedDBWorkerStrategy);
