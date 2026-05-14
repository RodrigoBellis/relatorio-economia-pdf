const temValor = (valor) =>
  valor !== null && valor !== undefined && String(valor).trim() !== "";

const emNegrito = (valor) => `*${String(valor).trim()}*`;

const paraNumeroBR = (valor) => {
  if (!temValor(valor)) return null;
  const numero = Number(
    String(valor).replace(/\./g, "").replace(",", ".").replace(/[^\d.-]/g, "")
  );
  return Number.isFinite(numero) ? numero : null;
};

const paraMoedaBR = (numero) =>
  numero.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const formatarMoeda = (valor) => {
  const numero = paraNumeroBR(valor);
  return numero === null ? String(valor || "").trim() : paraMoedaBR(numero);
};

const calcularEconomia = (dados) => {
  if (temValor(dados.economia)) return String(dados.economia).trim();
  const semCredito = paraNumeroBR(dados.sem_credito);
  const fatura = paraNumeroBR(dados.fatura);
  if (semCredito === null || fatura === null) return "";
  return paraMoedaBR(Math.max(0, semCredito - fatura));
};

export const gerarMensagem = (dados) => {
  const economia = calcularEconomia(dados);
  const linhasResumo = [];

  if (temValor(economia)) {
    linhasResumo.push(`Sua economia neste mês foi de R$ ${emNegrito(economia)}.`);
  }

  if (temValor(dados.co2)) {
    linhasResumo.push(
      `Além disso, você evitou a emissão de ${emNegrito(`${String(dados.co2).trim()} kg de CO2`)}, contribuindo para um futuro mais sustentável. ♻️⚡`
    );
  }

  const linhasFatura = [
    temValor(dados.fatura)
      ? `💰 Valor a pagar: R$ ${emNegrito(formatarMoeda(dados.fatura))}`
      : "",
    temValor(dados.vencimento) ? `📅 Vencimento: ${emNegrito(dados.vencimento)}` : "",
    temValor(dados.sem_credito)
      ? `🔌 Custo sem a Net+ Energia: R$ ${emNegrito(formatarMoeda(dados.sem_credito))}`
      : "",
    temValor(dados.credito) ? `⚡ Crédito compensado: ${emNegrito(`${dados.credito} kWh`)}` : "",
    temValor(dados.consumo) ? `🔋 Energia consumida: ${emNegrito(`${dados.consumo} kWh`)}` : "",
    temValor(dados.desconto) ? `💵 Desconto líquido aplicado: ${emNegrito(dados.desconto)}` : "",
  ].filter(Boolean);

  return `Boa tarde! 🌞

Aqui é o Bellis, da Net + Energia.
Segue a fatura referente ao mês ${emNegrito(dados.periodo || "--/----")}, com todos os detalhes da sua economia:

💡 Resumo da Economia

${linhasResumo.length ? linhasResumo.join("\n") : "Não foi possível calcular a economia neste documento."}

🔢 Dados da Instalação

Número da Instalação: ${emNegrito(dados.instalacao || "-")}
Cliente: ${emNegrito(dados.cliente || "-")}

📊 Detalhes da Fatura

${linhasFatura.length ? linhasFatura.join("\n") : "Não foram encontrados dados detalhados da fatura neste documento."}

💳 Forma de pagamento: ${emNegrito(dados.pagamento || "Asaas")}

Qualquer dúvida, estou à disposição!
Atenciosamente,
Bellis - Net+ Energia`;
};
