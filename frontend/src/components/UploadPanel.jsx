import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── icon components ────────────────────────────────────────────────────── */
function WhatsAppIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function statusStyle(tipo) {
  if (tipo === 'sucesso') return { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.22)' };
  if (tipo === 'erro')    return { color: '#f43f5e', bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.22)'  };
  return                         { color: '#06b6d4', bg: 'rgba(6,182,212,0.08)',  border: 'rgba(6,182,212,0.22)'  };
}

export function UploadPanel({ fileRef, status, onEnviarPdf, onCopiarMensagem, onAbrirWhatsApp }) {
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);
  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && fileRef.current) {
      const dt = new DataTransfer();
      dt.items.add(file);
      fileRef.current.files = dt.files;
      setFileName(file.name);
    }
  };

  return (
    <section className="mb-4">
      {/* Upload zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className="rounded-[22px] p-5 transition-all duration-250"
        style={{
          background: dragging ? 'rgba(99,102,241,0.06)' : 'transparent',
          border: dragging
            ? '2px solid rgba(99,102,241,0.5)'
            : '1px solid rgba(99,102,241,0.15)',
          boxShadow: dragging ? '0 0 24px rgba(99,102,241,0.12)' : 'none',
        }}
      >
        <label className="block text-[11.5px] font-bold uppercase tracking-[0.14em] text-blue-700 dark:text-indigo-400 mb-3">
          Selecionar relatório em PDF
        </label>

        <div
          className="relative rounded-[16px] overflow-hidden transition-all duration-200
            bg-gradient-to-b from-blue-50/80 to-indigo-50/50
            dark:from-white/[0.03] dark:to-white/[0.01]
            border border-blue-100 dark:border-white/[0.07]
            hover:border-indigo-300 dark:hover:border-indigo-500/40"
        >
          <input
            ref={fileRef}
            type="file"
            id="pdfFile"
            accept=".pdf"
            onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
            className="w-full py-4 px-4 text-[13.5px] cursor-pointer
              text-slate-700 dark:text-slate-300
              file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0
              file:text-[12px] file:font-semibold file:cursor-pointer
              file:bg-blue-100 file:text-blue-700
              dark:file:bg-indigo-500/15 dark:file:text-indigo-300
              hover:file:bg-blue-200 dark:hover:file:bg-indigo-500/25
              bg-transparent border-0 outline-none transition-colors duration-200"
          />
        </div>

        <p className="mt-2.5 text-[12px] leading-relaxed text-slate-500 dark:text-slate-600">
          Envie o PDF do relatório de economia. O sistema vai montar a mensagem automaticamente no padrão pronto para WhatsApp.
        </p>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap mt-4">
        {/* Gerar mensagem */}
        <motion.button
          type="button"
          onClick={onEnviarPdf}
          whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(249,115,22,0.35)' }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden btn-shine flex items-center gap-2 px-5 py-3 rounded-2xl
            text-white font-bold text-[14px] transition-all duration-200
            bg-orange-500 hover:bg-orange-600"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Gerar mensagem
        </motion.button>

        {/* Copiar mensagem */}
        <motion.button
          type="button"
          onClick={onCopiarMensagem}
          whileHover={{ scale: 1.02, boxShadow: '0 0 18px rgba(37,99,235,0.15)' }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden btn-shine flex items-center gap-2 px-5 py-3 rounded-2xl
            font-bold text-[14px] transition-all duration-200
            bg-white dark:bg-white/[0.04]
            border border-blue-100 dark:border-white/[0.08]
            text-blue-700 dark:text-indigo-300
            hover:bg-blue-50 dark:hover:bg-white/[0.07]
            shadow-md shadow-blue-50 dark:shadow-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Copiar mensagem
        </motion.button>

        {/* Abrir no WhatsApp */}
        <motion.button
          type="button"
          onClick={onAbrirWhatsApp}
          whileHover={{ scale: 1.02, boxShadow: '0 0 22px rgba(16,185,129,0.3)' }}
          whileTap={{ scale: 0.97 }}
          className="relative overflow-hidden btn-shine flex items-center gap-2 px-5 py-3 rounded-2xl
            text-white font-bold text-[14px] transition-all duration-200
            shadow-lg shadow-emerald-200/50 dark:shadow-none"
          style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}
        >
          <WhatsAppIcon />
          Abrir no WhatsApp
        </motion.button>
      </div>

      {/* Status */}
      <div className="min-h-[36px] mt-3">
        <AnimatePresence>
          {status && (() => {
            const s = statusStyle(status.tipo);
            return (
              <motion.div
                key={status.texto}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-[12.5px] font-bold"
                style={{ color: s.color, background: s.bg, border: `1px solid ${s.border}` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                {status.texto}
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}
