import multer from "multer";

export const errorHandler = (error, _req, res, next) => {
  if (error instanceof multer.MulterError && error.code === "LIMIT_FILE_SIZE") {
    return res.status(413).json({ erro: "Arquivo acima do limite de 10 MB." });
  }

  if (error) {
    console.error("Erro nao tratado na API.", error);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }

  return next();
};

