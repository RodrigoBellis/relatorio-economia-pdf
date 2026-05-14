import cors from "cors";
import express from "express";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { healthRouter } from "./routes/health.routes.js";
import { messageRouter } from "./routes/message.routes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use(healthRouter);
  app.use(messageRouter);

  const distPath = join(__dirname, "../../frontend/dist");
  if (existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get("*", (req, res) => res.sendFile(join(distPath, "index.html")));
  }

  app.use(errorHandler);

  return app;
};

