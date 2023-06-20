var _a;
import { taskHolder } from '../taskHolder.js';
export let PostMessage;
try {
    if (!window || (window === null || window === void 0 ? void 0 : window.document) === undefined) {
        // web worker
        PostMessage = (_a = (this || {})) === null || _a === void 0 ? void 0 : _a.postMessage;
    }
    else {
        // main thread
        PostMessage = taskHolder.onmessage;
    }
}
catch (error) {
    // web worker
    PostMessage = postMessage;
}
