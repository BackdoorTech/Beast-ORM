import { error } from '../Utility/Either/APIResponse';

class Logger {
  log() {}
  error(error) {
    try {
      console.error(error)
    } catch (e) {}
  }
}


export const logger = new Logger