import { Router } from "express";
import { gerarMensagemController } from "../controllers/message.controller.js";
import { uploadPdf } from "../middlewares/upload.middleware.js";

const messageRouter = Router();

messageRouter.post(
  "/api/gerar-mensagem",
  uploadPdf.single("pdf"),
  gerarMensagemController
);
messageRouter.post(
  "/gerar-mensagem",
  uploadPdf.single("pdf"),
  gerarMensagemController
);

export { messageRouter };

