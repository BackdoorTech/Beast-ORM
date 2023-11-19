import { registerPipe } from "../Utility/Either/APIResponse.js";
function executionTime({ createdDate, THIS }) {
    THIS.executionTime = () => {
        return new Date() - createdDate;
    };
}
registerPipe(executionTime);
