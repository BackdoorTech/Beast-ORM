
class DataBaseRequestHandler implements DataBaseRequestHandlerStrategy {
  enqueueTransaction() {
    throw new Error("Method not implemented.");
  }

}

class DataBaseRequestHandlerBusyStrategy implements DataBaseRequestHandlerStrategy {
  enqueueTransaction() {
    throw new Error("Method not implemented.");
  }
}


class DataBaseRequestHandlerOnRestStrategy implements DataBaseRequestHandlerStrategy {
  enqueueTransaction() {
    throw new Error("Method not implemented.");
  }
}


interface DataBaseRequestHandlerStrategy {
  enqueueTransaction()
}
