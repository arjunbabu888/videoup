import express from "express";
import fs from "fs";
import path from "path";

const PORT = 5001;
const LIMIT = "10mb";

const app = express();

app.use(express.raw({ type: "application/octet-stream", limit: LIMIT }));

app.get("/", async (req, res, next) => {
  return res.json({ statusCode: 200, status: "success" });
});

app.post("/upload", async (req, res, next) => {});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
