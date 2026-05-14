export function ResultPanel({ mensagem, onMensagemChange }) {
  return (
    <section className="result-card">
      <div className="result-top">
        <h3>Mensagem gerada</h3>
        <div className="result-chip">Pronta para WhatsApp</div>
      </div>

      <textarea
        value={mensagem}
        onChange={(event) => onMensagemChange(event.target.value)}
        placeholder="A mensagem aparecera aqui..."
      />
    </section>
  );
}

