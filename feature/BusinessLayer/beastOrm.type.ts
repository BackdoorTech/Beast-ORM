import { Model } from "../Presentation/Api"

export interface register {
  databaseName: string,
  version: number,
  type: 'indexedDB' | 'localStorage'
  models: typeof Model[],
  /**
   * @description restore values from localStorage for LocalStorage Models
   */
  restore?: boolean,
  ignoreFieldsStartWidth?: string[]
}
