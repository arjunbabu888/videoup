import { IUploadRepository } from "./interface";

export class UploadService {
  constructor(private readonly uploads: IUploadRepository) {}

  async uploadChunk(uploadId: string, chunkIndex: number, data: Buffer): Promise<void> {
    await this.uploads.saveChunk(uploadId, chunkIndex, data);
  }

  async assemble(uploadId: string, fileName: string, totalChunks: number): Promise<void> {
    await this.uploads.assemble(uploadId, fileName, totalChunks);
  }
}
