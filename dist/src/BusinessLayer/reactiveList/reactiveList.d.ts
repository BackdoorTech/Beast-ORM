import { Model } from "../../Presentation/Api";
import { ICallBackReactiveList } from "../_interface/interface.type";
export declare class ReactiveList {
    subscribe(model: typeof Model<any>, callback: ICallBackReactiveList): {
        readonly value: any;
        readonly subscribe: {
            dispatchUID: string;
            disconnect: () => void;
        };
        unsubscribe: () => Promise<void>;
        setUpdateUi(func: any): void;
    };
}
