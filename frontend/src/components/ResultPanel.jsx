import { motion } from 'framer-motion';

export function ResultPanel({ mensagem, onMensagemChange }) {
  const hasMsg = mensagem && mensagem.trim().length > 0;

  return (
    <section className="rounded-[22px] overflow-hidden
      bg-white/70 dark:bg-white/[0.025]
      border border-blue-100 dark:border-white/[0.07]
      shadow-inner"
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-3 px-5 py-3.5
        border-b border-blue-50 dark:border-white/[0.05]
        bg-white/60 dark:bg-white/[0.02]"
      >
        <h3 className="text-[15px] font-bold text-slate-800 dark:text-slate-100">Mensagem gerada</h3>
        <div className="flex items-center gap-2">
          {hasMsg && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10.5px] font-bold uppercase tracking-wider text-emerald-500 dark:text-emerald-400">
                Gerada
              </span>
            </motion.div>
          )}
          <div className="px-3 py-1.5 rounded-full text-[11px] font-bold
            bg-gradient-to-r from-green-50 to-emerald-50 dark:from-emerald-500/10 dark:to-green-500/10
            border border-green-100 dark:border-emerald-500/20
            text-green-700 dark:text-emerald-300">
            Pronta para WhatsApp
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="relative p-4">
        <textarea
          value={mensagem}
          onChange={(e) => onMensagemChange(e.target.value)}
          placeholder="A mensagem aparecerá aqui após processar o PDF..."
          className="w-full min-h-[440px] resize-y rounded-[16px] p-5
            text-[14.5px] leading-[1.85] outline-none
            font-mono
            bg-white dark:bg-[#0d0d1a]
            border border-blue-100 dark:border-white/[0.06]
            text-slate-800 dark:text-slate-200
            placeholder-slate-400 dark:placeholder-slate-700
            transition-all duration-200
            focus:border-indigo-300 dark:focus:border-indigo-500/40
            focus:shadow-[0_0_0_3px_rgba(99,102,241,0.1)]
            dark:focus:shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
        />
        {!hasMsg && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 opacity-20
              bg-indigo-100 dark:bg-indigo-500/10
              border border-indigo-200 dark:border-indigo-500/20"
            >
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
