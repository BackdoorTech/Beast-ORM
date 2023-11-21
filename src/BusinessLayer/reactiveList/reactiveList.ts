import { Model } from "../../Presentation/Api";
import { Either } from "../../Utility/Either/index.js";
import { ICallBackReactiveList } from "../_interface/interface.type";

export  class ReactiveList {

  subscribe(model: typeof Model<any>, callback :ICallBackReactiveList) {
    let value;
    let updateUi

    let subscription = model.transactionOnCommit(async () => {
      const result = await  callback(model)
      if(result.isOk) {
        value = result.value
      }
      if(updateUi) updateUi()
    })

    callback(model).then(result => {
      value = result
      if(updateUi) updateUi()
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
