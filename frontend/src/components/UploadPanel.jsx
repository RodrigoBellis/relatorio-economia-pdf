export function UploadPanel({
  fileRef,
  status,
  onEnviarPdf,
  onCopiarMensagem,
  onAbrirWhatsApp,
}) {
  return (
    <section className="upload-card">
      <label className="label" htmlFor="pdfFile">
        Selecionar relatorio em PDF
      </label>

      <div className="upload-zone">
        <input ref={fileRef} type="file" id="pdfFile" accept=".pdf" />
        <div className="upload-help">
          Envie o PDF do relatorio de economia. O sistema vai montar a mensagem
          automaticamente no padrao pronto para WhatsApp.
        </div>
      </div>

      <div className="actions">
        <button type="button" className="btn btn-primary" onClick={onEnviarPdf}>
          Gerar mensagem
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCopiarMensagem}
        >
          Copiar mensagem
        </button>
        <button
          type="button"
          className="btn btn-whatsapp"
          onClick={onAbrirWhatsApp}
        >
          Abrir no WhatsApp
        </button>
      </div>

      <div className="status-wrap">
        {status && <div className={`status ${status.tipo}`}>{status.texto}</div>}
      </div>
    </section>
  );
}

