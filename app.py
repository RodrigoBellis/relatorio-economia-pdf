from flask import Flask, request, render_template, jsonify
import re
import pdfplumber

app = Flask(__name__)

CAMPOS = {
    "periodo": r"Período Referente\s+([0-9]{2}/[0-9]{4})",
    "instalacao": r"Número Instalação\s+([0-9]+)",
    "cliente": r"Cliente\s+(.+)",
    "desconto": r"Desconto L[íi]quido Aplicado\s+([0-9.,%]+)",
    "consumo": r"Consumo Energia \(kWh\)\s+([0-9.,]+)",
    "credito": r"Crédito Injetado \(kWh\)\s+([0-9.,]+)",
    "sem_credito": r"Conta Distribuidora sem Crédito de Energia\s+R\$\s*([0-9.,]+)",
    "fatura": r"Fatura Net\+\s*Energia\s+R\$\s*([0-9.,]+)",
    "economia": r"Economia Mensal\s+R\$\s*([0-9.,]+)",
    "co2": r"Redu[cç][aã]o de Emiss[aã]o de CO.?2 \(Kg/m[eê]s\)\s+([0-9.,]+)",
    "vencimento": r"Data Vencimento\s+([0-9]{2}/[0-9]{2}/[0-9]{4})",
    "pagamento": r"Tipo de Pagamento\s+([A-Za-zÀ-ÿ ]+)",
}

def limpar_valor(texto: str) -> str:
    return re.sub(r"\s+", " ", texto).strip()

def extrair_campo(texto: str, padrao: str) -> str:
    match = re.search(padrao, texto, re.IGNORECASE)
    return limpar_valor(match.group(1)) if match else ""

def extrair_texto_pdf(arquivo_pdf) -> str:
    texto = []
    with pdfplumber.open(arquivo_pdf) as pdf:
        for pagina in pdf.pages:
            pagina_texto = pagina.extract_text() or ""
            texto.append(pagina_texto)
    return "\n".join(texto)

def dados_do_relatorio(texto: str) -> dict:
    dados = {}
    for chave, padrao in CAMPOS.items():
        dados[chave] = extrair_campo(texto, padrao)

    pagamento = dados.get("pagamento", "").strip()
    if pagamento.lower() == "boleto":
        dados["pagamento"] = "Boleto bancário"
    elif pagamento:
        dados["pagamento"] = pagamento
    else:
        dados["pagamento"] = "Boleto bancário"

    return dados

def gerar_mensagem(dados: dict) -> str:
    return f"""Boa tarde! 🌞

Aqui é o Bellis, da Net + Energia.
Segue a fatura referente ao mês *{dados.get('periodo', '')}*, com todos os detalhes da sua economia:

💡 Resumo da Economia

Sua economia neste mês foi de R$ *{dados.get('economia', '')}*.
Além disso, você evitou a emissão de *{dados.get('co2', '')} kg de CO₂*, contribuindo para um futuro mais sustentável. ♻️⚡

🔢 Dados da Instalação

Número da Instalação: *{dados.get('instalacao', '')}*
Cliente: *{dados.get('cliente', '')}*

📊 Detalhes da Fatura

💰 Valor a pagar: R$ *{dados.get('fatura', '')}*
📅 Vencimento: *{dados.get('vencimento', '')}*
🔌 Conta da distribuidora sem crédito: R$ *{dados.get('sem_credito', '')}*
⚡ Crédito injetado: *{dados.get('credito', '')} kWh*
🔋 Energia consumida: *{dados.get('consumo', '')} kWh*
💵 Desconto líquido aplicado: *{dados.get('desconto', '')}*

💳 Forma de pagamento: *{dados.get('pagamento', '')}*

Qualquer dúvida, estou à disposição!
Atenciosamente,
Bellis – Net+ Energia"""

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/gerar-mensagem", methods=["POST"])
def gerar():
    if "pdf" not in request.files:
        return jsonify({"erro": "Nenhum arquivo enviado."}), 400

    arquivo = request.files["pdf"]

    if arquivo.filename == "":
        return jsonify({"erro": "Arquivo inválido."}), 400

    try:
        texto = extrair_texto_pdf(arquivo)
        dados = dados_do_relatorio(texto)
        mensagem = gerar_mensagem(dados)
        return jsonify({
            "sucesso": True,
            "mensagem": mensagem,
            "dados": dados
        })
    except Exception as e:
        return jsonify({"erro": f"Erro ao processar PDF: {str(e)}"}), 500

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="127.0.0.1", port=5000)