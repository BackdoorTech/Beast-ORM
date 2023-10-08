const signalServiceData = {
    rewriteGet: {},
    rewriteSave: {},
    rewriteDelete: {},
};
export const rewrite = {
    rewriteGet: {
        connect(callback, models) {
            for (let model of models) {
                const modelName = model.getTableSchema().id.keyPath;
                signalServiceData.rewriteGet[modelName] = callback;
            }
        }
    },
    rewriteSave: {
        connect(callback, models) {
            for (let model of models) {
                const modelName = model.getTableSchema().id.keyPath;
                signalServiceData.rewriteSave[modelName] = callback;
            }
        }
    },
    rewriteDelete: {
        connect(callback, models) {
            for (let model of models) {
                const modelName = model.getTableSchema().id.keyPath;
                signalServiceData.rewriteDelete[modelName] = callback;
            }
        }
    },
    hasRewriteGet(ModalName) {
        return signalServiceData.rewriteGet[ModalName] != null;
    },
    hasRewriteSave(ModalName) {
        return signalServiceData.rewriteSave[ModalName] != null;
    },
    hasRewriteDelete(ModalName) {
        return signalServiceData.rewriteDelete[ModalName] != null;
    }
};
export const signalExecutor = {
    rewriteGet(ModalName, instance) {
        return signalServiceData.rewriteGet[ModalName]({ key: ModalName, localStorage: localStorage, instance });
    },
    rewriteSave(ModalName, instance, dataToSave) {
        return signalServiceData.rewriteSave[ModalName]({ key: ModalName, localStorage: localStorage, instance, dataToSave });
    },
    rewriteDelete(ModalName, instance) {
        return signalServiceData.rewriteDelete[ModalName]({ key: ModalName, localStorage: localStorage, instance });
    }
};
