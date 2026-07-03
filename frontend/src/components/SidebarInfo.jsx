import { motion } from 'framer-motion';

const STEPS = [
  { n: 1, text: 'Escolha o relatório em PDF.' },
  { n: 2, text: <>Clique em <strong className="text-slate-900 dark:text-white">Gerar mensagem</strong>.</> },
  { n: 3, text: 'Revise, copie ou abra no WhatsApp.' },
];

function MiniCard({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -2, boxShadow: '0 14px 30px rgba(37,99,235,0.1)' }}
      className="mt-4 p-4 rounded-[20px] transition-colors duration-200
        bg-white/80 dark:bg-white/[0.03]
        border border-blue-100 dark:border-white/[0.06]
        shadow-sm shadow-blue-50/50 dark:shadow-none"
    >
      {children}
    </motion.div>
  );
}

export function SidebarInfo() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="rounded-[28px] p-5 overflow-hidden
        bg-white/80 dark:bg-white/[0.025]
        backdrop-blur-xl
        border border-blue-100 dark:border-white/[0.07]
        shadow-xl shadow-blue-100/30 dark:shadow-black/40"
    >
      {/* Brand */}
      <div className="flex items-center gap-3.5 mb-1">
        <div className="w-14 h-14 rounded-[18px] flex items-center justify-center font-black text-xl shrink-0
          bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-indigo-500/15 dark:to-violet-500/10
          border border-blue-100 dark:border-indigo-500/20
          text-blue-700 dark:text-indigo-300
          shadow-md shadow-blue-100/50 dark:shadow-none"
        >
          N+
        </div>
        <div>
          <h2 className="text-[18px] font-black text-slate-900 dark:text-white tracking-tight leading-none">
            Net+ Energia
          </h2>
          <p className="text-[12.5px] text-slate-500 mt-1 leading-snug">
            Automação de atendimento com interface moderna e leve.
          </p>
        </div>
      </div>

      {/* How it works */}
      <MiniCard delay={0.08}>
        <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 mb-2">Como funciona</h3>
        <p className="text-[12.5px] text-slate-500 leading-relaxed mb-3">
          O sistema processa o PDF e devolve a mensagem pronta para copiar ou abrir no WhatsApp Web.
        </p>
        <div className="flex flex-col gap-2.5">
          {STEPS.map(({ n, text }) => (
            <div key={n} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5
                bg-gradient-to-br from-cyan-50 to-blue-100 dark:from-cyan-500/10 dark:to-blue-500/10
                border border-cyan-100 dark:border-cyan-500/20
                text-blue-700 dark:text-cyan-300"
              >
                {n}
              </div>
              <span className="text-[12.5px] text-slate-600 dark:text-slate-400 leading-snug">{text}</span>
            </div>
          ))}
        </div>
      </MiniCard>

      {/* Internal environment */}
      <MiniCard delay={0.14}>
        <h3 className="text-[14px] font-bold text-slate-800 dark:text-slate-100 mb-2">Ambiente interno</h3>
        <p className="text-[12.5px] text-slate-500 leading-relaxed">
          Ideal para faturamento, cobrança, atendimento e rotina operacional da equipe.
        </p>
        {/* feature pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {['PDF → WhatsApp', 'Rápido', 'Editável'].map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full text-[10.5px] font-semibold
              bg-indigo-50 dark:bg-indigo-500/10
              border border-indigo-100 dark:border-indigo-500/20
              text-indigo-600 dark:text-indigo-300">
              {tag}
            </span>
          ))}
        </div>
      </MiniCard>
    </motion.aside>
  );
}
