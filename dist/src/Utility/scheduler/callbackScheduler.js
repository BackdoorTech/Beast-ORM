/**
 * Manages a queue of callbacks and controls their execution with start, pause, and resume functionality.
 */
export class CallbackScheduler {
    constructor() {
        this.callbackQueue = []; // A queue to store the callbacks.
        this.running = false; // Tracks whether the scheduler is running.
    }
    /**
     * Enqueues a callback function to be executed in the queue.
     * @param callback - The callback function to be executed.
     * @returns A function to rerun the callback
     */
    enqueueCallback(callback) {
        const add = () => { this.callbackQueue.push(callback); };
        add();
        return add;
    }
    /**
     * Adds a callback function to the queue or run immediately depending on `this.running` state
     * @param callback - The callback function to be added to the queue.
     * @returns A function to remove the callback from the queue.
     */
    function(callback) {
        return async (...args) => {
            return new Promise(async (resolve) => {
                if (this.running) {
                    resolve(await callback(...args));
                }
                else {
                    this.callbackQueue.push(async () => {
                        resolve(await callback(...args));
                    });
                }
            });
        };
    }
    /**
     * Starts the execution of callbacks in the queue.
     */
    start() {
        if (!this.running) {
            this.running = true;
            this.executeNextCallback();
        }
    }
    /**
     * Pauses the execution of callbacks.
     */
    pause() {
        this.running = false;
    }
    /**
     * Resumes the execution of callbacks.
     */
    resume() {
        if (!this.running) {
            this.running = true;
            this.executeNextCallback();
        }
    }
    /**
     * Executes the next callback in the queue, removing it after execution.
     */
    executeNextCallback() {
        if (this.running && this.callbackQueue.length > 0) {
            const callback = this.callbackQueue.shift();
            callback();
            this.executeNextCallback(); // Execute the next callback
        }
    }
}
// // Example usage:
// const manager = new CallbackScheduler();
// manager.enqueueCallback(() => {
//   console.log("Callback 1 executed.");
// });
// manager.enqueueCallback(() => {
//   console.log("Callback 2 executed.");
// });
// manager.enqueueCallback(() => {
//   console.log("Callback 3 executed.");
// });
// manager.start();
// setTimeout(() => {
//   manager.pause();
//   console.log("Manager paused.");
// }, 3000);
// setTimeout(() => {
//   manager.resume();
//   console.log("Manager resumed.");
// }, 6000);
// const timingManager = new CallbackScheduler();
// class someResponsibility{
//   constructor() {
//     setTimeout(()=> {
//       timingManager.start()
//     }, 1000)
//     this.execute()
//   }
//   execute = timingManager.triggerToEnqueueCallback(()=> {
//   })
// }
