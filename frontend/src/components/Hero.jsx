import { motion } from 'framer-motion';
import { useState } from 'react';

/* Logo da Net+ Energia — usa /logo-netmais-energia.png se existir,
   cai para texto "Net+ Energia" caso o arquivo não esteja presente. */
function BrandLogo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="text-[22px] font-black tracking-tight">
        <span className="text-blue-700 dark:text-blue-400">Net</span>
        <span className="text-orange-500">+</span>
        <span className="text-blue-700 dark:text-blue-400"> Energia</span>
      </span>
    );
  }

  /* A logo tem "Net" em branco + "+Energia" em laranja (arte para fundo escuro).
     Colocamos numa placa institucional escura para a marca ficar 100% legível
     e sem cortes, tanto no tema claro quanto no escuro. */
  return (
    <div className="inline-flex items-center justify-center px-6 py-4 rounded-2xl
      bg-gradient-to-br from-[#0b1e3f] to-[#0a2c66]
      border border-blue-900/40
      shadow-lg shadow-blue-900/20">
      <img
        src="/logo-netmais-energia.png"
        alt="Net+ Energia"
        className="h-16 sm:h-20 w-auto object-contain"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

/* Sun icon */
function SunIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <circle cx="12" cy="12" r="5" />
      <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

/* Moon icon */
function MoonIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}

export function Hero({ dark, setDark }) {
  return (
    <header className="flex flex-col items-center text-center gap-3 mb-8 relative">
      {/* Theme toggle — canto superior direito */}
      <motion.button
        onClick={() => setDark(!dark)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.93 }}
        title={dark ? 'Ativar modo claro' : 'Ativar modo escuro'}
        className="absolute top-0 right-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200
          bg-white/80 dark:bg-white/[0.06]
          border border-blue-100 dark:border-white/[0.1]
          text-slate-600 dark:text-slate-300
          hover:text-orange-500
          shadow-md shadow-blue-50 dark:shadow-black/20
          backdrop-blur-xl"
      >
        {dark ? <SunIcon /> : <MoonIcon />}
      </motion.button>

      {/* Logo */}
      <BrandLogo />

      {/* Título institucional */}
      <h1 className="text-[30px] sm:text-[34px] font-black leading-tight tracking-tight m-0 text-blue-800 dark:text-blue-300">
        Gerador de Relatório de Economia
      </h1>

      {/* Subtítulo */}
      <p className="text-slate-500 dark:text-slate-400 text-[14px] leading-relaxed max-w-[560px]">
        Crie mensagens e relatórios personalizados para clientes Net+ Energia
      </p>
    </header>
  );
}
