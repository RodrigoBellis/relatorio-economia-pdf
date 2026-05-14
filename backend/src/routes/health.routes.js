import { Router } from "express";
import { healthController } from "../controllers/health.controller.js";

const healthRouter = Router();

healthRouter.get("/api/health", healthController);
healthRouter.get("/health", healthController);

export { healthRouter };

