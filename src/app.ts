import PromptService from "./core/prompt/prompt.service";
import FfmpegExec from "./commands/ffmpeg/ffmpeg.exec";
import ConsoleLogger from "./out/console-logger/console-logger";

/**
 * First example class
 */
class App {
  /**
   * First example method of class App
   * @param what Key to identify value in container.
   */
  async run() {
    await new FfmpegExec(ConsoleLogger.getInstance()).execute();
  }
}

const app = new App();
app.run();
