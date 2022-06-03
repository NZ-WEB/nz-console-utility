import { IStreamLogger } from "../../core/handlers/Stream-logger.interface";

/**
 * ConsoleLogger class логирует в консоль аргументы
 */
export default class ConsoleLogger implements IStreamLogger {
  private static logger: ConsoleLogger;

  private static getInstance() {
    if (!ConsoleLogger.logger) {
      ConsoleLogger.logger = new ConsoleLogger();
    }
    return ConsoleLogger.logger;
  }

  end(): void {
    console.log("Операция успешно выполнена");
  }

  error(...args: any[]): void {
    console.error(...args);
  }

  log(...args: any[]): void {
    console.log(...args);
  }
}
