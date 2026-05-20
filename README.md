<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:2d1b69&height=180&section=header&text=Relatório+Econômico+PDF&fontSize=40&fontColor=a78bfa&animation=fadeIn&fontAlignY=40&desc=Extrator+e+gerador+de+mensagens+a+partir+de+relatórios+em+PDF&descColor=8b949e&descSize=16&descAlignY=62" />

<br/>

<p>
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img alt="Express" src="https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img alt="Vite" src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>
<p>
  <img alt="Deploy" src="https://img.shields.io/badge/Deploy-Render-46E3B7?style=for-the-badge&logo=render&logoColor=black"/>
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
  <img src="https://img.shields.io/github/last-commit/RodrigoBellis/relatorioeconomiapdf?style=flat-square&color=a78bfa&label=último%20commit"/>
</p>

</div>

---

## 📖 Sobre o Projeto

O **Relatório Econômico PDF** é uma aplicação Full Stack que extrai automaticamente dados de relatórios econômicos em PDF e gera mensagens formatadas prontas para uso.

> Backend Node.js/Express faz o parsing do PDF. Frontend React apresenta os resultados e permite copiar a mensagem gerada com um clique.

---

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|---------------|-----------|
| 📤 **Upload de PDF** | Envio do relatório via interface web |
| 🔍 **Extração automática** | Parser extrai campos econômicos do texto do PDF |
| 📝 **Geração de mensagem** | Template automatizado com os dados extraídos |
| ✅ **Validação** | Verifica se o PDF tem texto selecionável e layout esperado |
| 🌐 **Full Stack** | Frontend React + Backend Node.js em monorepo |
| 🚀 **Deploy Render** | Configurado para deploy automático no Render |

---

## 🏗️ Arquitetura

```
relatorioeconomiapdf/
├── backend/
│   └── src/
│       ├── config/
│       │   ├── env.js                      # Variáveis de ambiente tipadas
│       │   └── extraction-patterns.js      # Padrões regex para extração
│       ├── controllers/
│       │   ├── health.controller.js        # GET /health
│       │   └── message.controller.js       # POST /gerar-mensagem
│       ├── middlewares/
│       │   ├── error-handler.middleware.js  # Tratamento global de erros
│       │   └── upload.middleware.js         # Multer para upload de arquivos
│       ├── routes/
│       │   ├── health.routes.js
│       │   └── message.routes.js
│       ├── services/
│       │   ├── message-template.service.js  # Geração da mensagem final
│       │   └── report-data.service.js       # Extração de dados do PDF
│       ├── utils/
│       │   ├── pdf-validator.utils.js       # Validação do arquivo enviado
│       │   └── text.utils.js               # Funções auxiliares de texto
│       ├── app.js                           # Setup Express + rotas
│       └── server.js                        # Entry point
│
├── frontend/
│   └── src/
│       ├── components/                      # Componentes React
│       ├── hooks/
│       │   └── useMessageGenerator.js      # Lógica de estado
│       ├── services/
│       │   └── messageApi.js               # Integração com a API
│       ├── utils/
│       │   └── messageActions.js           # Ações (cópia, etc.)
│       └── App.jsx
│
├── render.yaml                              # Configuração de deploy Render
└── package.json                             # Scripts monorepo com concurrently
```

---

## 🛠️ Stack Tecnológica

**Backend**
| Tecnologia | Finalidade |
|-----------|-----------|
| Node.js 18 | Runtime |
| Express 4 | Framework HTTP |
| pdf-parse | Extração de texto de PDFs |
| multer | Upload de arquivos (multipart/form-data) |
| cors | Cross-Origin Resource Sharing |

**Frontend**
| Tecnologia | Finalidade |
|-----------|-----------|
| React 18 | Interface |
| Vite 5 | Bundler |

---

## 📡 Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Health check do servidor |
| `POST` | `/gerar-mensagem` | Envia PDF, retorna mensagem gerada + dados extraídos |

### Exemplo de requisição

```bash
curl -X POST http://localhost:5050/gerar-mensagem \
  -F "arquivo=@relatorio.pdf"
```

### Exemplo de resposta

```json
{
  "sucesso": true,
  "mensagem": "...",
  "dados": {
    "campo1": "valor1",
    "campo2": "valor2"
  }
}
```

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+

### Desenvolvimento (frontend + backend simultâneos)

```bash
# Instale as dependências raiz
npm install

# Instale deps do backend e frontend
npm --prefix backend install
npm --prefix frontend install

# Inicie ambos em paralelo
npm run dev
```

- Frontend: **http://localhost:5173**
- Backend:  **http://localhost:5050**

### Build de produção

```bash
npm run build
npm start
```

---

## 🚀 Deploy (Render)

O projeto já está configurado para deploy no **Render** via `render.yaml`:

1. Faça fork ou conecte o repositório no [Render Dashboard](https://dashboard.render.com)
2. O Render detecta o `render.yaml` automaticamente
3. `buildCommand`: `npm run build`
4. `startCommand`: `npm start`

---

## 🔮 Próximas Melhorias

- [ ] Testes automatizados com Jest + Supertest
- [ ] Suporte a múltiplos templates de relatório
- [ ] Histórico de extrações
- [ ] Autenticação para uso multi-usuário
- [ ] Docker + CI/CD com GitHub Actions

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](./LICENSE) para mais informações.

---

<div align="center">

Desenvolvido por **[Rodrigo Bellis](https://github.com/RodrigoBellis)** &nbsp;·&nbsp; 2026

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:2d1b69,100:0d1117&height=100&section=footer" />

</div>
