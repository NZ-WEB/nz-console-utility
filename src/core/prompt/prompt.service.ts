import inquirer from "inquirer";
// eslint-disable-next-line import/extensions
import { PromptType } from "./prompt.types";

/**
 * Prompt Service Class реализует функционал ввода данных в STD.IN
 */
export default class PromptService {
  /**
   * Input
   * @param message display this text in console before question
   * @param type set type of prop
   */
  public async input<T>(message: string, type: PromptType) {
    const { result } = await inquirer.prompt<{ result: T }>([
      {
        type,
        name: "result",
        message,
      },
    ]);
    return result;
  }
}
