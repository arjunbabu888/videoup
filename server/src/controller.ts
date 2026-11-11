import { Request, Response } from "express";
import { UploadService } from "./service";
import { ReqHeader } from "./interface";

export class VideoUploadController {
  constructor(private readonly service: UploadService) {}

  uploadChunk = async (req: Request, res: Response): Promise<void> => {
    try {
      const uploadId = this.getHeader(req, ReqHeader.uploadId);
      const chunkIdx = Number(this.getHeader(req, ReqHeader.index));
      
      if (!uploadId || !chunkIdx) {
        throw new Error("Missing or invalid upload headers");
      }
      if (!Buffer.isBuffer(req.body)) {
        throw new Error("Body not contain binary data");
      }

      await this.service.uploadChunk(uploadId, chunkIdx, req.body);
      res.status(200).json({ success: true, msg: "binary upload successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, msg: this.getErrorMessage(error) });
    }
  };

  assembleVideo = async (req: Request, res: Response): Promise<void> => {
    try {
      const { fileName = null, totalChunks = null, uploadId = null } = req.body ?? {};
      if (!uploadId || !fileName || !totalChunks) {
        throw new Error("Missing required assembly metadata");
      }

      await this.service.assemble(uploadId, fileName, totalChunks);
      res.status(200).json({
        success: true,
        msg: "File successfully assembled",
        fileName,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: this.getErrorMessage(error) });
    }
  };

  private getHeader(req: Request, name: string): string | undefined {
    const value = req.headers[name];
    return Array.isArray(value) ? value[0] : value;
  }

  private getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : "Unexpected upload error";
  }
}
