import { transactionOnCommit } from "../triggers/transaction.js";
let values = {};
export class ReactiveList {
    static subscribe(Model, callback) {
        let transactionOnCommitSubscription;
        let value = [];
        (async () => {
            value = await callback(Model);
        })();
        transactionOnCommitSubscription = transactionOnCommit.subscribe(Model, async () => {
            value = await callback(Model);
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
            }
        };
    }
}
