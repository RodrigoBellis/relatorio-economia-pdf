export const validarArquivoPdf = (arquivo) => {
  if (!arquivo) {
    return { valido: false, erro: "Nenhum arquivo enviado." };
  }

  const nomeArquivo = (arquivo.originalname || "").toLowerCase();
  if (!nomeArquivo.endsWith(".pdf")) {
    return { valido: false, erro: "Envie um arquivo com extensao .pdf." };
  }

  const assinatura = arquivo.buffer.subarray(0, 5).toString("utf8");
  if (assinatura !== "%PDF-") {
    return {
      valido: false,
      erro: "Arquivo invalido. O conteudo nao parece ser um PDF valido.",
    };
  }

  return { valido: true, erro: "" };
};

