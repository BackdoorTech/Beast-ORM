import { transactionOnCommit } from "../triggers/transaction.js";
let values = {};
export class ReactiveList {
    static subscribe(Model, callback) {
        let transactionOnCommitSubscription;
        let value;
        let updateUi;
        transactionOnCommitSubscription = transactionOnCommit.subscribe(Model, async () => {
            value = await callback(Model);
            if (updateUi) {
                updateUi();
            }
        });
        callback(Model).then(result => {
            value = result;
            if (updateUi) {
                updateUi();
            }
        });
        return {
            get value() {
                return value;
            },
            get subscribe() {
                return transactionOnCommitSubscription.subscribe;
            },
            unsubscribe: async () => {
                return await transactionOnCommitSubscription.unsubscribe();
            },
            setUpdateUi(func) {
                updateUi = func;
            }
        };
    }
}
