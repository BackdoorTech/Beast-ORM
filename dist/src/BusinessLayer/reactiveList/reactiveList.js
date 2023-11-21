export class ReactiveList {
    subscribe(model, callback) {
        let value;
        let updateUi;
        let subscription = model.transactionOnCommit(async () => {
            const result = await callback(model);
            if (result.isOk) {
                value = result.value;
            }
            if (updateUi)
                updateUi();
        });
        callback(model).then(result => {
            value = result;
            if (updateUi)
                updateUi();
        });
        return {
            get value() {
                return value;
            },
            get subscribe() {
                return subscription;
            },
            unsubscribe: async () => {
                return await subscription.disconnect();
            },
            setUpdateUi(func) {
                updateUi = func;
            }
        };
    }
}
