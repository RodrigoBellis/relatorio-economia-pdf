export const gerarMensagemPorPdf = async (arquivoPdf) => {
  const formData = new FormData();
  formData.append("pdf", arquivoPdf);

  const response = await fetch("/api/gerar-mensagem", {
    method: "POST",
    body: formData,
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(
      data?.erro || "Erro ao processar o PDF. Verifique se a API esta ativa."
    );
  }

  return data;
};

