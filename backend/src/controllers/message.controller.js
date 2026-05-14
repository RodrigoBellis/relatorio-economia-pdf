import pdf from "pdf-parse";
import { extrairDadosDoRelatorio } from "../services/report-data.service.js";
import { gerarMensagem } from "../services/message-template.service.js";
import { validarArquivoPdf } from "../utils/pdf-validator.utils.js";

export const gerarMensagemController = async (req, res) => {
  const validacao = validarArquivoPdf(req.file);
  if (!validacao.valido) {
    return res.status(400).json({ erro: validacao.erro });
  }

  try {
    const resultadoPdf = await pdf(req.file.buffer);
    const texto = resultadoPdf.text || "";
    const dados = extrairDadosDoRelatorio(texto, {
      nomeArquivo: req.file?.originalname || "",
    });
    const totalCamposPreenchidos = Object.values(dados).filter(Boolean).length;

    if (totalCamposPreenchidos <= 1) {
      return res.status(422).json({
        erro: "Nao foi possivel extrair os dados do PDF. Verifique se o arquivo tem texto selecionavel e se segue o layout esperado do relatorio.",
      });
    }

    return res.status(200).json({
      sucesso: true,
      mensagem: gerarMensagem(dados),
      dados,
    });
  } catch (error) {
    console.error("Falha ao processar o PDF enviado.", error);
    return res.status(500).json({ erro: "Erro interno ao processar o PDF." });
  }
};
