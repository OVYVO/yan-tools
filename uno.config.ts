import { defineConfig, presetIcons, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1.1,
      /** 使用已安装的 @iconify-json/*，避免构建依赖外网 CDN */
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
    borderRadius: {
      'ui-sm': '6px',
      'ui-md': '10px',
      'ui-lg': '14px',
    },
  },
  shortcuts: {
    /** 页面主背景（语义） */
    'bento-page-bg': 'min-h-screen bg-[var(--ui-bg-base)] text-[var(--ui-text-primary)]',
    /** 与顶栏内容区一致；min-w-0 避免 flex 子项撑破视口，overflow-x-clip 防止子元素横向溢出 */
    'site-content-width':
      'box-border mx-auto min-w-0 w-full max-w-[min(100%,1440px)] overflow-x-clip px-4 sm:px-6',
    /** Bento Cell：统一圆角 radius-lg、浅阴影/边框（全站一致） */
    'bento-surface':
      'rounded-ui-lg border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-elevated)] shadow-[var(--ui-shadow-card)] backdrop-blur-md',
    'bento-surface-hover':
      'motion-safe:transition-all motion-safe:duration-200 motion-safe:ease-out hover:border-sky-400/35 hover:shadow-[var(--ui-shadow-card-hover)] dark:hover:border-sky-400/25 motion-reduce:transition-none',
    'bento-inset':
      'rounded-ui-md border border-slate-200/60 bg-slate-50/80 dark:border-white/[0.06] dark:bg-slate-950/40',
    'bento-label':
      'text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-sky-600/90 dark:text-sky-400/85',
    /** 字阶（与规范 4.3 对齐） */
    'text-page-title': 'text-3xl font-bold tracking-tight sm:text-4xl text-[var(--ui-text-primary)]',
    'text-section-title': 'text-lg font-semibold tracking-tight text-[var(--ui-text-primary)]',
    'text-body': 'text-[0.95rem] leading-[1.55] text-[var(--ui-text-secondary)]',
    'text-caption': 'text-sm text-[var(--ui-text-muted)]',
    'bento-btn-primary':
      'rounded-ui-md bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-500/25 transition motion-safe:duration-200 hover:from-sky-400 hover:to-sky-500 hover:shadow-lg hover:shadow-sky-500/30 disabled:cursor-not-allowed disabled:opacity-60',
    'bento-btn-secondary':
      'rounded-ui-md border border-slate-200/90 bg-white/90 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition motion-safe:duration-200 hover:border-sky-300/50 hover:bg-sky-50/80 dark:border-white/10 dark:bg-slate-800/80 dark:text-slate-100 dark:hover:border-sky-400/25',
    'bento-link':
      'font-medium text-sky-600 underline-offset-2 transition motion-safe:duration-200 hover:text-sky-700 hover:underline dark:text-sky-400 dark:hover:text-sky-300',
    /** 工具卡：内边距 20px；平板每行 2 列、桌面每行 4 列，避免窄屏四列挤压 */
    'tool-card':
      'relative isolate box-border flex h-full min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-ui-lg border border-[var(--ui-border-subtle)] bg-[var(--ui-bg-elevated)] p-5 shadow-[var(--ui-shadow-card)] backdrop-blur-md md:col-span-6 lg:col-span-3 transition-[transform,box-shadow,border-color] duration-[180ms] ease-out before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:z-[1] before:w-[3px] before:rounded-l-[14px] before:bg-gradient-to-b before:from-sky-400 before:to-sky-600 before:opacity-0 before:transition-opacity before:duration-200 hover:border-sky-400/35 hover:shadow-[var(--ui-shadow-card-hover)] hover:before:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/55 motion-safe:hover:-translate-y-0.5 motion-safe:hover:scale-[1.01] dark:hover:border-sky-400/25 motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100',
    /**
     * 工具详情页：输入/输出双栏。显式 gap-x/gap-y，避免栏间视觉「贴在一起」
     */
    /** 列宽见 main.css .tool-io-grid（minmax(0,1fr) 防止栅格被内容撑开） */
    'tool-io-grid':
      'grid min-w-0 w-full gap-x-5 gap-y-5',
    /** 表单多列控件（如复选框网格） */
    'tool-field-grid':
      'grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-3',
    /** 三列参数控件 */
    'tool-triple-grid':
      'grid w-full grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-4',
    /** 工具卡列表：行列间距统一为 20px（与 tool-io-grid 一致） */
    'bento-tool-grid':
      'grid w-full grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-5 md:grid-cols-12 md:gap-5',
    'bento-grid':
      'grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-12 md:gap-5',
    'bento-section-y': 'flex flex-col gap-10 lg:gap-12',
    /** 首页/分类/搜索等主容器：与顶栏 `site-content-width` 同宽、同水平 padding，保证与导航内容区对齐 */
    'bento-container':
      'relative box-border mx-auto min-w-0 w-full max-w-[min(100%,1440px)] overflow-x-clip px-4 pb-16 sm:px-6',
    /** 图标尺寸分级（顶栏与内容区一致） */
    'icon-sm': 'text-[15px] leading-none [&:is(span)]:block',
    'icon-md': 'text-xl leading-none [&:is(span)]:block',
  },
})
