import { taskHolder } from '../taskHolder.js';
export let PostMessage = postMessage;
// run this in global scope of window or worker. since window.self = window, we're ok
try {
    if (!window || (window === null || window === void 0 ? void 0 : window.document) === undefined) {
        PostMessage = postMessage;
    }
    else {
        PostMessage = (data) => {
            console.log("bug");
            taskHolder.onmessage(data);
        };
    }
}
catch (error) {
    PostMessage = postMessage;
}
