import { Model } from "../../Presentation/Api";
import { Either } from "../../Utility/Either/index.js";
import { ICallBackReactiveList } from "../_interface/interface.type";

export  class ReactiveList {

  subscribe(model: typeof Model<any>, callback :ICallBackReactiveList<any>) {
    let value: any[];
    let updateUi

    let subscription = model.transactionOnCommit(async () => {
      const [valueToUpdate, result] = await  callback(model as any)
      if(result.isOk) {
        value = valueToUpdate
        if(updateUi) updateUi()
      }

    })

    callback(model as any).then(([valueToUpdate, result]) => {
      if(result.isOk) {
        value = valueToUpdate
        if(updateUi) updateUi()
      }
    });

    return {
      get value () {
        return value
      },
      get subscribe() {
        return subscription
      },
      unsubscribe: async () => {
        return await subscription.disconnect()
      },
      setUpdateUi(func) {
        updateUi  = func
      }
    }
  }
}
