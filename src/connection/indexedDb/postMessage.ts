
import { taskHolder } from '../taskHolder.js'

export let PostMessage: typeof postMessage | null = postMessage

try {
    if (!window || window?.document === undefined) {
        // web worker
        PostMessage = postMessage
    } else {
        // main thread
        PostMessage = taskHolder.onmessage
    }
} catch (error) {
    // web worker
    PostMessage = postMessage
}
