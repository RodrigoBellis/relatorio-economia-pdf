import { CAMPOS } from "../config/extraction-patterns.js";
import {
  extrairCampo,
  extrairPrimeiroNumeroAposRotulo,
  extrairValorMonetarioAposRotulo,
  limparValor,
  normalizarTextoParaBusca,
} from "../utils/text.utils.js";

const extrairClienteDoNomeArquivo = (nomeArquivo = "") => {
  const nomeSemExtensao = nomeArquivo
    .replace(/\.pdf$/i, "")
    .replace(/\s*\(\d+\)\s*$/i, "");

  const match = nomeSemExtensao.match(
    /^boleto_asaas_(.+)_([0-9]{8})$/i
  );
  if (!match) {
    return "";
  }

  const clienteNoNome = match[1]
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return limparValor(clienteNoNome);
};

const normalizarValorMonetario = (valor = "") =>
  String(valor)
    .replace(/\s+/g, "")
    .replace(/[^0-9,.-]/g, "")
    .trim();

export const extrairDadosDoRelatorio = (texto, opcoes = {}) => {
  const textoNormalizado = normalizarTextoParaBusca(texto);
  const dados = {};

  for (const [chave, regex] of Object.entries(CAMPOS)) {
    dados[chave] = extrairCampo(textoNormalizado, regex);
  }

  // Fallbacks para PDFs com quebra irregular de linhas.
  if (!dados.periodo) {
    dados.periodo = extrairPrimeiroNumeroAposRotulo(
      textoNormalizado,
      /Periodo\s+Referente/i
    );
  }
  if (!dados.instalacao) {
    dados.instalacao = extrairPrimeiroNumeroAposRotulo(
      textoNormalizado,
      /Numero\s+Instalacao/i
    );
  }
  if (!dados.economia) {
    dados.economia = extrairPrimeiroNumeroAposRotulo(
      textoNormalizado,
      /Economia\s+Mensal/i
    );
  }
  if (!dados.economia) {
    dados.economia = extrairValorMonetarioAposRotulo(
      textoNormalizado,
      /Economia\s+(?:Liquida|Liquda|Bruta)/i
    );
  }
  if (!dados.economia) {
    dados.economia = extrairValorMonetarioAposRotulo(
      textoNormalizado,
      /Sua\s+economia/i
    );
  }
  if (!dados.credito) {
    dados.credito = extrairPrimeiroNumeroAposRotulo(
      textoNormalizado,
      /Credito\s+Compensado\s*\(kWh\)/i
    );
  }
  if (!dados.fatura) {
    dados.fatura = extrairValorMonetarioAposRotulo(
      textoNormalizado,
      /Fatura\s+Net\+\s*Energia/i
    );
  }
  if (!dados.fatura) {
    dados.fatura = extrairValorMonetarioAposRotulo(
      textoNormalizado,
      /Valor\s+do\s+(?:Pagamento|Documento)/i
    );
  }
  if (!dados.sem_credito) {
    dados.sem_credito = extrairValorMonetarioAposRotulo(
      textoNormalizado,
      /(?:Conta\s+(?:da\s+)?Distribuidora\s+sem\s+Credito(?:\s+de)?\s+Energia|Custo\s+sem\s+a\s+Net\+\s*Energia)/i
    );
  }
  if (!dados.vencimento) {
    const vencimento = textoNormalizado.match(
      /(?:Data\s+)?Vencimento[\s:]*([0-9]{2}[\/.-][0-9]{2}[\/.-][0-9]{2,4})/i
    );
    dados.vencimento = vencimento ? limparValor(vencimento[1]) : "";
  }
  if (!dados.co2) {
    dados.co2 = extrairPrimeiroNumeroAposRotulo(
      textoNormalizado,
      /Reducao\s+de\s+CO2/i
    );
  }
  if (!dados.cliente) {
    dados.cliente = extrairClienteDoNomeArquivo(opcoes.nomeArquivo || "");
  }

  dados.fatura = normalizarValorMonetario(dados.fatura);
  dados.sem_credito = normalizarValorMonetario(dados.sem_credito);
  dados.economia = normalizarValorMonetario(dados.economia);

  const pagamento = (dados.pagamento || "").trim();
  if (pagamento.toLowerCase() === "boleto") {
    dados.pagamento = "Boleto bancario";
  } else if (pagamento) {
    dados.pagamento = pagamento;
  } else {
    dados.pagamento = "Boleto bancario";
  }

  return dados;
};
