import { BackgroundOrbs } from "./components/BackgroundOrbs";
import { Hero } from "./components/Hero";
import { ResultPanel } from "./components/ResultPanel";
import { SidebarInfo } from "./components/SidebarInfo";
import { UploadPanel } from "./components/UploadPanel";
import { useMessageGenerator } from "./hooks/useMessageGenerator";
import { abrirNoWhatsApp, copiarTexto } from "./utils/messageActions";

function App() {
  const { fileRef, mensagem, setMensagem, status, enviarPdf, atualizarStatus } =
    useMessageGenerator();

  const onCopiarMensagem = async () => {
    try {
      await copiarTexto(mensagem);
      atualizarStatus("sucesso", "Mensagem copiada com sucesso.");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Falha ao copiar.");
    }
  };

  const onAbrirWhatsApp = () => {
    try {
      abrirNoWhatsApp(mensagem);
    } catch (error) {
      alert(error instanceof Error ? error.message : "Falha ao abrir WhatsApp.");
    }
  };

  return (
    <>
      <BackgroundOrbs />
      <div className="app">
        <Hero />

        <div className="layout">
          <SidebarInfo />

          <main className="card main">
            <div className="main-header">
              <div>
                <h2>Painel de geracao</h2>
                <p>
                  Interface com estetica tecnologica em fundo claro, animacoes
                  suaves e foco em produtividade.
                </p>
              </div>
              <div className="tag">Sistema interno</div>
            </div>

            <UploadPanel
              fileRef={fileRef}
              status={status}
              onEnviarPdf={enviarPdf}
              onCopiarMensagem={onCopiarMensagem}
              onAbrirWhatsApp={onAbrirWhatsApp}
            />

            <ResultPanel mensagem={mensagem} onMensagemChange={setMensagem} />
          </main>
        </div>

        <div className="footer">
          Plataforma interna - Net+ Energia - Interface tecnologica clara
        </div>
      </div>
    </>
  );
}

export default App;
