import CommandExecutor from "../../core/executor/commandExecutor";
import { ICommandExecFfmpeg, IFfmpegInput } from "./ffmpeg.types";
import { IStreamLogger } from "../../core/handlers/Stream-logger.interface";
import FileService from "../../core/files/file.service";
import PromptService from "../../core/prompt/prompt.service";
import FfmpegBuilder from "./ffmpeg.builder";
import { ChildProcessWithoutNullStreams } from "child_process";
import { spawn } from "child_process";
import { StreamHandler } from "../../core/handlers/stream.handler";

export default class FfmpegExec extends CommandExecutor<IFfmpegInput> {
  private fileService: FileService = new FileService();
  private promptService: PromptService = new PromptService();

  protected async prompt(): Promise<IFfmpegInput> {
    const width = await this.promptService.input<number>("Ширина", "number");
    const height = await this.promptService.input<number>("Высота", "number");
    const path = await this.promptService.input<string>("Путь", "input");
    const name = await this.promptService.input<string>("Имя файла", "input");
    return { width, height, path, name };
  }

  constructor(logger: IStreamLogger) {
    super(logger);
  }

  protected build({
    width,
    height,
    path,
    name,
  }: IFfmpegInput): ICommandExecFfmpeg {
    const output = this.fileService.getFilePath(path, name, "mp4");
    const args = new FfmpegBuilder()
      .input(path)
      .setVideoSize(width, height)
      .output(output);
    return { command: "ffmpeg", args, output };
  }

  protected spawn({
    command,
    args,
    output,
  }: ICommandExecFfmpeg): ChildProcessWithoutNullStreams {
    this.fileService.deleteFileIfExists(output);
    return spawn(command, args);
  }

  protected processStream(
    stream: ChildProcessWithoutNullStreams,
    logger: IStreamLogger
  ): void {
    const handler = new StreamHandler(logger);
    handler.processOutput(stream);
  }
}
