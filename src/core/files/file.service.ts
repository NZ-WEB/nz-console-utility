import { dirname, join, isAbsolute } from "path";
import { promises } from "fs";

export default class FileService {
  private static async isExist(path: string) {
    try {
      await promises.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  public getFilePath(path: string, name: string, ext: string): string {
    if (!isAbsolute(path)) {
      path = join(__dirname + "/" + path);
    }
    return join(dirname(path) + "/" + name + "." + ext);
  }

  async deleteFileIfExists(path: string): Promise<void> {
    if (await FileService.isExist(path)) {
      await promises.unlink(path);
    }
  }
}
