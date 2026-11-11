export interface IUploadRepository {
  saveChunk(uploadId: string, chunkIndex: number, data: Buffer): Promise<void>;
  assemble(uploadId: string, fileName: string, totalChunks: number): Promise<void>;
}

export enum ReqHeader {
  "index" = "idx",
  "uploadId" = "x-upload-id",
}
