import { useRef, useState } from "react";
import { gerarMensagemPorPdf } from "../services/messageApi";

export const useMessageGenerator = () => {
  const fileRef = useRef(null);
  const [mensagem, setMensagem] = useState("");
  const [status, setStatus] = useState(null);

  const atualizarStatus = (tipo, texto) => {
    setStatus({ tipo, texto });
  };

  const enviarPdf = async () => {
    setMensagem("");
    setStatus(null);

    const arquivo = fileRef.current?.files?.[0];
    if (!arquivo) {
      atualizarStatus("erro", "Selecione um PDF primeiro.");
      return;
    }

    try {
      atualizarStatus("info", "Processando PDF...");
      const data = await gerarMensagemPorPdf(arquivo);
      setMensagem(data?.mensagem || "");
      atualizarStatus("sucesso", "Mensagem gerada com sucesso.");
    } catch (error) {
      const erroConhecido = error instanceof Error ? error.message : "";
      atualizarStatus(
        "erro",
        erroConhecido ||
          "Erro de conexao com o servidor. Inicie a API com `npm run dev:backend`."
      );
    }
  };

  return {
    fileRef,
    mensagem,
    setMensagem,
    status,
    enviarPdf,
    atualizarStatus,
  };
};

