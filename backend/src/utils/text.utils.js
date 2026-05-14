export const limparValor = (texto = "") => texto.replace(/\s+/g, " ").trim();

export const normalizarTextoParaBusca = (texto = "") =>
  texto
    .replace(/\u00A0/g, " ")
    .replace(/₂/g, "2")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

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

