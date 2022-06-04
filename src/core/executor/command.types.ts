import { promisify } from "util";

export interface ICommandExec {
  command: string;
  args: string[];
}
