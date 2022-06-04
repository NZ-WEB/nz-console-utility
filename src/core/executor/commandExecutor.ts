import { IStreamLogger } from "../handlers/Stream-logger.interface";
import { ChildProcessWithoutNullStreams, spawn } from "child_process";
import { ICommandExec } from "./command.types";

export default abstract class CommandExecutor<Input> {
  constructor(private logger: IStreamLogger) {}

  public async execute() {
    const input = await this.prompt();
    const command = this.build(input);
    const stream = this.spawn(command);
    this.processStream(stream, this.logger);
  }

  protected abstract prompt(): {
    path: Promise<any>;
    width: Promise<any>;
    name: Promise<any>;
    height: Promise<any>;
  };
  protected abstract build(input: Input): ICommandExec;
  protected abstract spawn(
    command: ICommandExec
  ): ChildProcessWithoutNullStreams;
  protected abstract processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void;
}
