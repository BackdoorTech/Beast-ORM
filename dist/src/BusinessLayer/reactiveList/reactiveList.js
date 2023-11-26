export class ReactiveList {
    subscribe(model, callback) {
        let value;
        let updateUi;
        let subscription = model.transactionOnCommit(async () => {
            const [valueToUpdate, result] = await callback(model);
            if (result.isOk) {
                value = valueToUpdate;
                if (updateUi)
                    updateUi();
            }
        });
        callback(model).then(([valueToUpdate, result]) => {
            if (result.isOk) {
                value = valueToUpdate;
                if (updateUi)
                    updateUi();
            }
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
