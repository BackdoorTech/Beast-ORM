import { LocalStorage } from "./model.js"


interface params {
    key: string,  
    localStorage: typeof localStorage, 
    instance: typeof LocalStorage[],
    dataToSave: any
}


const signalServiceData = {
    rewriteGet: {},
    rewriteSave: {},
    rewriteDelete: {},
}

export const signals = {
    rewriteGet: {
        connect(callback: (params: params) => void, models: typeof LocalStorage[]) {
            for(let model of models) {
                const modelName = model.getModelName()
                signalServiceData.rewriteGet[modelName] = callback
            }
        }
    },
    rewriteSave: {
        connect(callback: (params: params) => void, models: typeof LocalStorage[]) {
            for(let model of models) {
                const modelName = model.getModelName()
                signalServiceData.rewriteSave[modelName] = callback
            }
        }
    },
    rewriteDelete: {
        connect(callback: (params: params) => void, models: typeof LocalStorage[]) {
            for(let model of models) {
                const modelName = model.getModelName()
                signalServiceData.rewriteDelete[modelName] = callback
            }
        }
    },
    hasRewriteGet(ModalName: string) {
        return signalServiceData.rewriteGet[ModalName] != null
    },
    hasRewriteSave(ModalName: string) {
        return signalServiceData.rewriteSave[ModalName] != null
    },
    hasRewriteDelete(ModalName: string) {
        return signalServiceData.rewriteDelete[ModalName] != null
    }
}

export const signalExecutor = {
    rewriteGet(ModalName: string, instance) {
        return signalServiceData.rewriteGet[ModalName]({key:ModalName, localStorage:localStorage, instance})
    },
    rewriteSave(ModalName: string, instance, dataToSave) {
        return signalServiceData.rewriteSave[ModalName]({key:ModalName, localStorage:localStorage, instance, dataToSave})
    },
    rewriteDelete(ModalName: string, instance) {
        return signalServiceData.rewriteDelete[ModalName]({key:ModalName, localStorage:localStorage, instance})
    }
}