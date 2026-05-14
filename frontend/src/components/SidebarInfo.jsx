export function SidebarInfo() {
  return (
    <aside className="card sidebar">
      <div className="brand">
        <div className="brand-icon">N+</div>
        <div className="brand-info">
          <h2>Net+ Energia</h2>
          <p>Automacao de atendimento com interface moderna e leve.</p>
        </div>
      </div>

      <div className="mini-panel">
        <h3>Como funciona</h3>
        <p>
          O sistema processa o PDF e devolve a mensagem pronta para copiar ou
          abrir no WhatsApp Web.
        </p>

        <div className="steps">
          <div className="step">
            <div className="step-bullet">1</div>
            <div>Escolha o relatorio em PDF.</div>
          </div>
          <div className="step">
            <div className="step-bullet">2</div>
            <div>
              Clique em <strong>Gerar mensagem</strong>.
            </div>
          </div>
          <div className="step">
            <div className="step-bullet">3</div>
            <div>Revise, copie ou abra no WhatsApp.</div>
          </div>
        </div>
      </div>

      <div className="mini-panel">
        <h3>Ambiente interno</h3>
        <p>
          Ideal para faturamento, cobranca, atendimento e rotina operacional da
          equipe.
        </p>
      </div>
    </aside>
  );
}

