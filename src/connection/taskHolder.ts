import { Methods, getParams, Method } from '../models/model.interface.js'

interface TaskHolderInterface {
	type?: 'response' | 'Register',
	queryId: string,
	params: any,
	method: 'execute' | 'migrate',
	callback: Function,
	done?: Function
}

class _taskHolder {

	private  tasks: {[key: string]:  TaskHolderInterface} = {}

	register(data: TaskHolderInterface) {
		this.tasks[data.queryId] = data
	}
	
	finish(queryId) {
		try {
			delete this.tasks[queryId]
		} catch (error) {}
	}

	updateFunction(queryId, run , func:Function) {
		
		this.tasks[queryId][run] = (message) =>{
			func(message.value)
		}
	}

	async onmessage (data: any) {
		const value = this.tasks[data.queryId]
		value[data.run](data)
	}

}


export const taskHolder = new _taskHolder()