import { DatabaseMemory } from './db.js'

class transactionRequest {
    private type: string
    private value: any
    private key: any
    private result: any

    
    set onsuccess(func) {
        func({e:{target:{result: this.result}}})
    }

}

export class transaction {

    data: {[ key: string]: any[]}
    constructor(data) {
        this.data = data
    }

    request;
    add() {}
    getAll (){}

    objectStore = (name) => {
        return {
            add:(value, key?) =>  {
                this.request = new transactionRequest()
                this.request.type = 'add'
                this.request.value = value
                this.request.key = key
                this.request.result = this.data[name].push(value)
                return this.request
            },
            getAll:() => {
                this.request = new transactionRequest()
                this.request.type = 'getAll'
                this.request.result = this.data[name]
                return this.request
            }
        }
    }

    onerror(){}
    oncomplete(){}
    onabort (){}
}