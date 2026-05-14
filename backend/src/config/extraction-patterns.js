export const CAMPOS = {
  periodo: /Periodo\s+Referente[\s:]*([0-9]{2}\/[0-9]{4})/i,
  instalacao: /Numero\s+Instalacao[\s:]*([0-9][0-9.\-]*)/i,
  cliente: /Cliente[\s:]*([^\n\r]+)/i,
  desconto: /Desconto\s+Liquido\s+Aplicado[\s:]*([0-9.,%]+)/i,
  consumo: /Consumo(?:\s+de)?\s+Energia\s*\(kWh\)[\s:]*([0-9.,]+)/i,
  credito:
    /Credito\s+(?:Injetado|Compensado)\s*\(kWh\)[\s:]*([0-9.,]+)/i,
  sem_credito:
    /(?:Conta\s+(?:da\s+)?Distribuidora\s+sem\s+Credito(?:\s+de)?\s+Energia(?:\s+Eletrica)?|Custo\s+sem\s+a\s+Net\+\s*Energia)(?:\s+R\$)?[\s:]*([-]?\s*[0-9][0-9.,\s]*)/i,
  fatura: /Fatura\s+Net\+\s*Energia(?:\s+R\$)?[\s:]*([0-9][0-9.,\s]*)/i,
  economia:
    /Economia\s+(?:Mensal|Liquida|Liquda|Bruta)(?:\s+R\$)?[\s:]*([0-9.,]+)/i,
  co2:
    /(?:Reducao\s+de\s+Emissao\s+de\s+CO2\s*\(Kg\/mes\)|Reducao\s+de\s+CO2)[\s:]*([0-9.,]+)/i,
  vencimento:
    /(?:Data\s+)?Vencimento[\s:]*([0-9]{2}[\/.-][0-9]{2}[\/.-][0-9]{2,4})/i,
  pagamento: /Tipo\s+de\s+Pagamento[\s:]*([A-Za-z ]+)/i,
};
