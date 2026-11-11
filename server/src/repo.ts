import path from "path";
import fs from "fs";
import { IUploadRepository } from "./interface";
import { randomUUID } from "crypto";
import { pipeline } from "stream/promises";

export class UploadRepository implements IUploadRepository {
  constructor(private readonly uploadsDirectory: string) {}

  async saveChunk(uploadId: string, chunkIdx: number, data: Buffer): Promise<void> {
    const uploadDir = path.join(this.uploadsDirectory, uploadId);
    try {
      await fs.promises.mkdir(uploadDir, { recursive: true });
      const chunkFilePath = path.join(uploadDir, `chunk_${chunkIdx}`);
      await fs.promises.writeFile(chunkFilePath, data);
    } catch (error) {
      throw error;
    }
  }

  async assemble(uploadId: string, fileName: string, totalChunks: number): Promise<void> {
    const uploadDir = path.join(this.uploadsDirectory, uploadId);
    const outputPath = path.join(this.uploadsDirectory, fileName);
    const temporaryPath = path.join(this.uploadsDirectory, `.upload-${randomUUID()}.tmp`);
   
    const writeStream = fs.createWriteStream(temporaryPath);
    try {
      for (let i = 0; i < totalChunks; i++) {
        const chunkFilePath = path.join(uploadDir, `chunk_${i}`);
        await pipeline(fs.createReadStream(chunkFilePath), writeStream, { end: false });
      }

      await new Promise<void>((resolve, reject) => {
        writeStream.end((err: any) => {
          if (err) reject(err);
        });

        writeStream.on("finish", resolve);
        writeStream.on("error", reject);
      });

      await fs.promises.rename(temporaryPath, outputPath);
      await fs.promises.rm(uploadDir, { recursive: true, force: true });
    } catch (error) {
      await fs.promises.rm(temporaryPath, { force: true });
      writeStream.destroy();
      throw error;
    }
  }
}
