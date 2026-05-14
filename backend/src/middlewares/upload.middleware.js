import multer from "multer";
import { env } from "../config/env.js";

const storage = multer.memoryStorage();

export const uploadPdf = multer({
  storage,
  limits: { fileSize: env.maxPdfSizeBytes },
});

