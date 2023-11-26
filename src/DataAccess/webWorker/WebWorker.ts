// postMessage("I\'m working before postMessage(\'ali\').");
import { IndexedDBStrategy } from '../DataSource/indexeDB/DriverAdapters/DriverAdapterIndexedDB'
import { IReturnObject } from '../DriverAdapters/DriverAdapter.type';

// const Strategy = new IndexedDBStrategy()
type returnFunction = (returnObject: IReturnObject) => void

onmessage = async (oEvent) => {

  // const method = "insert"
  // let params: any = ["table", {}]
  // const fun: Function = Strategy[method]

  // const onsuccess = () => {}
  // const onerror = () => {}
  // const done = () => {}

  // fun(...params  as any)(
  //   onsuccess,
  //   onerror,
  //   done
  // )

};
