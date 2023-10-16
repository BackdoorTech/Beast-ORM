/**
 * Manages a queue of callbacks and controls their execution with start, pause, and resume functionality.
 */
export declare class CallbackScheduler {
    private callbackQueue;
    private running;
    /**
     * Enqueues a callback function to be executed in the queue.
     * @param callback - The callback function to be executed.
     * @returns A function to rerun the callback
     */
    enqueueCallback(callback: () => void): Function;
    /**
     * Adds a callback function to the queue or run immediately depending on `this.running` state
     * @param callback - The callback function to be added to the queue.
     * @returns A function to remove the callback from the queue.
     */
    function<T>(callback: (...args: any) => any): (...args: any) => Promise<T>;
    /**
     * Starts the execution of callbacks in the queue.
     */
    start(): void;
    /**
     * Pauses the execution of callbacks.
     */
    pause(): void;
    /**
     * Resumes the execution of callbacks.
     */
    resume(): void;
    /**
     * Executes the next callback in the queue, removing it after execution.
     */
    executeNextCallback(): void;
}
