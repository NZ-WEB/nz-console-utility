import { ChildProcessWithoutNullStreams } from "child_process";
import { IStreamLogger } from "./Stream-logger.interface";

/**
 * StreamHandler class абстрактная ручка встраивания логов в outstream
 * @param logger логгер типа IStreamLogger
 */
export class StreamHandler {
  constructor(private logger: IStreamLogger) {}

  processOutput(stream: ChildProcessWithoutNullStreams) {
    stream.stdout.on("data", (data: any) => {
      this.logger.log(data.toString());
    });

    stream.stderr.on("data", (data: any) => {
      this.logger.error(data.toString());
    });

    stream.on("close", () => {
      this.logger.end();
    });
  }
}
