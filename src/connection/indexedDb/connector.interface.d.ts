
export interface TransactionOptions {
  storeName: string;
  dbMode: IDBTransactionMode;
  error: (e: Event) => any;
  complete: (e: Event) => any;
  abort?: any;
}