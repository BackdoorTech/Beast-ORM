import { Model } from "../models/model.js";
import { transactionOnCommit } from "../triggers/transaction.js";
import { uniqueGenerator } from "../utils.js";

let  values: {[key: string]: any}  = {}

export  class ReactiveList {

    static subscribe(model: typeof Model, callback) {
        let transactionOnCommitSubscription;
        let value;
        let updateUi;
        
        transactionOnCommitSubscription = transactionOnCommit.subscribe(model, async () => {
            value = await  callback(Model)
            if(updateUi) {
                updateUi()
            }
        })

        callback(Model).then(result => {
            value = result
            if(updateUi) {
                updateUi()
            }
        });
        
        return {
            get value () {
                return value
            },
            get subscribe() {
                return transactionOnCommitSubscription.subscribe
            },
            unsubscribe: async () => {
                return await transactionOnCommitSubscription.unsubscribe()
            },
            setUpdateUi(func) {
                updateUi  = func
            }
        }
    }
}