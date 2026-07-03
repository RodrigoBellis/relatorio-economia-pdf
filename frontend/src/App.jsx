import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { Hero }           from './components/Hero';
import { ResultPanel }    from './components/ResultPanel';
import { SidebarInfo }    from './components/SidebarInfo';
import { UploadPanel }    from './components/UploadPanel';
import { useMessageGenerator } from './hooks/useMessageGenerator';
import { abrirNoWhatsApp, copiarTexto } from './utils/messageActions';

export default function App() {
  /* ── dark mode ── */
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('netplus-theme');
    return saved !== null ? saved === 'dark' : true; // default: dark
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('netplus-theme', dark ? 'dark' : 'light');
  }, [dark]);

  /* ── message logic ── */
  const { fileRef, mensagem, setMensagem, status, enviarPdf, atualizarStatus } =
    useMessageGenerator();

  const onCopiarMensagem = async () => {
    try {
      await copiarTexto(mensagem);
      atualizarStatus('sucesso', 'Mensagem copiada com sucesso.');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Falha ao copiar.');
    }
  };

  const onAbrirWhatsApp = () => {
    try {
      abrirNoWhatsApp(mensagem);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Falha ao abrir WhatsApp.');
    }
  };

  return (
    /* root wrapper — bg switches via dark: variant */
    <div
      className={`
        min-h-screen transition-colors duration-300
        bg-gradient-to-b from-[#f8fbff] via-[#f3f7ff] to-[#eef4ff]
        dark:bg-none dark:bg-[#06060e]
        text-slate-900 dark:text-slate-100
        font-sans
      `}
    >
      <BackgroundOrbs />

      {/* bg grid overlay */}
      <div className="fixed inset-0 bg-grid pointer-events-none z-0 opacity-70" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 max-w-[1220px] mx-auto px-5 py-8 pb-6"
      >
        {/* Header */}
        <Hero dark={dark} setDark={setDark} />

        {/* Main layout */}
        <div className="content-grid grid gap-5">
          {/* responsive: stacks on narrow viewport */}
          <style>{`
            .content-grid{grid-template-columns:300px 1fr}
            @media(max-width:960px){.content-grid{grid-template-columns:1fr}}
          `}</style>
          <div style={{ display: 'contents' }}>
            <SidebarInfo />

            {/* Main card */}
            <main
              className="
                rounded-[28px] p-6 overflow-hidden
                bg-white/80 dark:bg-white/[0.025]
                backdrop-blur-xl
                border border-blue-100 dark:border-white/[0.07]
                shadow-xl shadow-blue-100/30 dark:shadow-black/40
                relative
              "
            >
              {/* subtle corner glow */}
              <div
                className="absolute top-0 right-0 w-72 h-48 pointer-events-none rounded-full"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)', filter: 'blur(24px)' }}
              />

              {/* Panel header */}
              <div className="relative flex items-start justify-between gap-4 mb-5 flex-wrap">
                <div>
                  <h2 className="text-[26px] font-black tracking-tight text-slate-900 dark:text-white">
                    Painel de geração
                  </h2>
                  <p className="text-[13.5px] text-slate-500 mt-1.5 leading-relaxed max-w-[640px]">
                    Interface com estética tecnológica, animações suaves e foco em produtividade.
                  </p>
                </div>
                <div className="px-3.5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider
                  bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-indigo-500/10 dark:to-violet-500/10
                  border border-blue-100 dark:border-indigo-500/20
                  text-blue-700 dark:text-indigo-300
                  shrink-0">
                  Sistema Interno
                </div>
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
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-[11.5px] tracking-wider text-slate-400 dark:text-slate-600">
          Net+ Energia © 2026 — Economia inteligente para sua conta de luz.
        </p>
      </motion.div>
    </div>
  );
}
