
import { taskHolder } from '../taskHolder.js'

export let PostMessage: typeof postMessage | null = postMessage


// run this in global scope of window or worker. since window.self = window, we're ok

try {
    if (!window || window?.document === undefined) {
        PostMessage = postMessage
    } else {
        PostMessage = taskHolder.onmessage
    }
} catch (error) {
    PostMessage = postMessage
}
