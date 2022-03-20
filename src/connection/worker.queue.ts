import { Methods, getParams, Method } from '../models/model.interface.js'

interface WsRegister {
	type?: 'response' | 'Register',
	func: Function
	queryId?: string,
	params: any,
	method: 'execute' | 'migrate',
}

export class _IndexedDBWorkerQueue {

	private myWorker = new Worker(new URL('./worker.js', import.meta.url),{ type: "module" });

	constructor() {
		this.myWorker.onmessage =  (oEvent) => {
			const data = oEvent.data
			this.onmessage(data)
		}
	}

	private  workerQueues: {[key: string]:  WsRegister} = {}

	register(data: WsRegister) {

		this.myWorker.postMessage(data.params);
		this.workerQueues[data.queryId] = data
		return data.queryId
	}

	async onmessage (data: any) {

		for (const [key, value] of Object.entries(this.workerQueues)) {
			const dontRepeat = await value.func(data)

			if(dontRepeat) {
				delete this.workerQueues[key]
			}
		}
	}

	requestHandler () {
			
	}

}


export const IndexedDBWorkerQueue = new _IndexedDBWorkerQueue()