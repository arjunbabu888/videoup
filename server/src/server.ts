import express, { type Request, type Response } from "express";
import path from "path";
import { UploadRepository } from "./repo";
import { VideoUploadController } from "./controller";
import { UploadService } from "./service";

const PORT = 5001;
const LIMIT = "10mb";

const app = express();

const uploadDir = path.join(__dirname, "uploads");

const repository = new UploadRepository(uploadDir);
const service = new UploadService(repository);
const controller = new VideoUploadController(service);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ statusCode: 200, status: "success" });
});

app.post("/upload", express.raw({ type: "application/octet-stream", limit: LIMIT }), controller.uploadChunk);

app.post("/assemble-vid", controller.assembleVideo);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
