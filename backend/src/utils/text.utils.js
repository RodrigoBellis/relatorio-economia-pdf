export const limparValor = (texto = "") => texto.replace(/\s+/g, " ").trim();

export const normalizarTextoParaBusca = (texto = "") =>
  texto
    .replace(/ /g, " ")
    .replace(/₂/g, "2")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

export const extrairCampo = (texto, regex) => {
  const match = texto.match(regex);
  return match ? limparValor(match[1]) : "";
};

export const extrairPrimeiroNumeroAposRotulo = (texto, rotuloRegex) => {
  const matchRotulo = texto.match(rotuloRegex);
  if (!matchRotulo) {
    return "";
  }

  const trechoAposRotulo = texto.slice(matchRotulo.index);
  const matchNumero = trechoAposRotulo.match(
    /([0-9]{1,3}(?:\.[0-9]{3})*(?:,[0-9]+)?|[0-9]+(?:,[0-9]+)?)/
  );

  return matchNumero ? limparValor(matchNumero[1]) : "";
};

export const extrairCodigoInstalacao = (texto) => {
  if (!texto) return "";

  const normalizado = String(texto)
    .replace(/ /g, " ")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  // Descritor opcional apos o rotulo, ex.: "Instalacao - Casa".
  // A classe usa apenas letras/espacos para nao consumir digitos do codigo.
  const regexes = [
    // Instalacao - Casa 12.317.995.018-26 | Instalacao: 12.317.995.018-26
    /instalacao\s*(?:[-–—]\s*[a-zA-Z][a-zA-Z ]*)?[:\s\-–—]*([0-9]{1,3}(?:\.[0-9]{3}){2,4}-[0-9]{1,3})/i,
    // Instalacao: 1231799501826 (sem pontuacao)
    /instalacao\s*(?:[-–—]\s*[a-zA-Z][a-zA-Z ]*)?[:\s\-–—]*([0-9]{6,20})/i,
    // Codigo de instalacao: 12.317.995.018-26
    /codigo\s+(?:da|de)\s+instalacao[:\s-]*([0-9][0-9.\-]{5,24})/i,
    // Unidade consumidora: 12.317.995.018-26
    /unidade\s+consumidora[:\s-]*([0-9][0-9.\-]{5,24})/i,
  ];

  for (const regex of regexes) {
    const match = normalizado.match(regex);
    if (match && match[1]) {
      return match[1].trim();
    }
  }

  return "";
};

export const extrairValorMonetarioAposRotulo = (texto, rotuloRegex) => {
  const matchRotulo = texto.match(rotuloRegex);
  if (!matchRotulo) {
    return "";
  }

  const trechoAposRotulo = texto.slice(matchRotulo.index);
  const matchValor = trechoAposRotulo.match(
    /(?:R\$\s*)?([-]?\s*[0-9]{1,3}(?:\.[0-9]{3})*,[0-9]{2}|[-]?\s*[0-9]+(?:,[0-9]{2})?)/
  );

  return matchValor ? limparValor(matchValor[1]) : "";
};
