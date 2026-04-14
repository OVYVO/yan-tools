import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.1,
      cdn: 'https://esm.sh/',
    }),
  ],
  theme: {
    colors: {
      brand: {
        DEFAULT: '#0ea5e9',
        muted: '#64748b',
      },
      bento: {
        canvas: '#f4f7fb',
        ink: '#0f172a',
      },
    },
  },
  shortcuts: {
    'bento-surface':
      'rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_2px_24px_-8px_rgba(15,23,42,0.1)] backdrop-blur-md dark:border-white/[0.08] dark:bg-slate-900/55 dark:shadow-[0_4px_40px_-12px_rgba(0,0,0,0.55)]',
    'bento-surface-hover':
      'transition-all duration-300 ease-out hover:border-sky-400/35 hover:shadow-[0_12px_40px_-12px_rgba(14,165,233,0.25)] hover:-translate-y-0.5 dark:hover:border-sky-400/25 dark:hover:shadow-[0_12px_48px_-16px_rgba(14,165,233,0.12)]',
    'bento-inset':
      'rounded-2xl border border-slate-200/60 bg-slate-50/80 dark:border-white/[0.06] dark:bg-slate-950/40',
    'bento-label':
      'text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-600/90 dark:text-sky-400/85',
    'bento-page-bg':
      'min-h-screen bg-[#f0f4f9] text-slate-900 dark:bg-[#0a0c10] dark:text-slate-50',
    'bento-btn-primary':
      'rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/25 transition hover:from-sky-400 hover:to-sky-500 hover:shadow-lg hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60',
    'bento-btn-secondary':
      'rounded-xl border border-slate-200/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-300/50 hover:bg-sky-50/80 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-sky-400/25',
    'bento-link':
      'font-medium text-sky-600 transition hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300',
  },
})
