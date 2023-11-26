import { registerPipe } from "../Utility/Either/APIresponse.js";
function executionTime({ createdDate, THIS }) {
    THIS.executionTime = () => {
        return new Date() - createdDate;
    };
}
registerPipe(executionTime);
