export const copiarTexto = async (texto) => {
  const conteudo = texto.trim();
  if (!conteudo) {
    throw new Error("Nao ha mensagem para copiar.");
  }

  try {
    await navigator.clipboard.writeText(conteudo);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = conteudo;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  }
};

export const abrirNoWhatsApp = (texto) => {
  const conteudo = texto.trim();
  if (!conteudo) {
    throw new Error("Gere a mensagem antes de enviar.");
  }

  const mensagemNormalizada = conteudo.normalize("NFC").replace(/\n/g, "\r\n");
  const url = `https://web.whatsapp.com/send?text=${encodeURIComponent(mensagemNormalizada)}`;
  window.open(url, "_blank", "noopener,noreferrer");
};

