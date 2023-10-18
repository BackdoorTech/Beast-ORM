declare class DataBaseRequestHandler implements DataBaseRequestHandlerStrategy {
    enqueueTransaction(): void;
}
declare class DataBaseRequestHandlerBusyStrategy implements DataBaseRequestHandlerStrategy {
    enqueueTransaction(): void;
}
declare class DataBaseRequestHandlerOnRestStrategy implements DataBaseRequestHandlerStrategy {
    enqueueTransaction(): void;
}
interface DataBaseRequestHandlerStrategy {
    enqueueTransaction(): any;
}
