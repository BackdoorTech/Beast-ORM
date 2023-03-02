class _taskHolder {
    constructor() {
        this.tasks = {};
    }
    register(data) {
        this.tasks[data.queryId] = data;
    }
    finish(queryId) {
        try {
            delete this.tasks[queryId];
        }
        catch (error) { }
    }
    updateFunction(queryId, run, func) {
        this.tasks[queryId][run] = (message) => {
            func(message.value);
        };
    }
    async onmessage(data) {
        const value = this.tasks[data.queryId];
        value[data.run](data);
    }
}
export const taskHolder = new _taskHolder();
