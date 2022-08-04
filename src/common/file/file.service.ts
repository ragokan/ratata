import { createWriteStream } from "fs";
import { join, resolve } from "path";
import { AppFile } from "src/common/types/app-file";

export class FileService {
  async uploadFile(file: AppFile) {
    const fileName = `${Date.now()}-${Math.floor(Math.random() * 100)}-${file.filename}`;
    return new Promise<string>((resolvePromise, reject) => {
      createWriteStream(join(resolve(), "public", fileName)).write(file.data, (error) => {
        if (error) return reject(error);
        resolvePromise("/public/" + fileName);
      });
    });
  }
}
