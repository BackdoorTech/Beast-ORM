import { IReturnObject } from "../../../../DriverAdapters/DriverAdapter.type";
import { IndexedDBStrategy } from "../DriverAdapterIndexeDB";

// const Strategy = new IndexedDBStrategy()
type returnFunction = (returnObject: IReturnObject) => void

onmessage = async (oEvent) => {

  // const { UUID, method, data, action, arg } = oEvent.data

  // let params: any = ["table", {}]
  // const fun: Function = Strategy[method]

  // const onsuccess = (data) => {
  //   postMessage({
  //     UUID,
  //     method: 'onsuccess',
  //     data,
  //   })
  // }
  // const onerror = () => {
  //   postMessage({
  //     UUID,
  //     method: 'onerror',
  //     data,
  //   })
  // }
  // const done = () => {
  //   postMessage({
  //     UUID,
  //     method: 'done',
  //     data,
  //   })
  // }

  // fun(...params  as any)(
  //   onsuccess,
  //   onerror,
  //   done
  // )

};
