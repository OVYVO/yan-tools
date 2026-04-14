import { watch, type MaybeRefOrGetter, toValue } from 'vue'
import { SITE_NAME } from '@/data/constants'

export function usePageMeta(meta: MaybeRefOrGetter<{ title?: string; description?: string }>) {
  const apply = () => {
    const m = toValue(meta)
    const title = m.title ? `${m.title} · ${SITE_NAME}` : SITE_NAME
    document.title = title
    let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', 'description')
      document.head.appendChild(el)
    }
    el.setAttribute('content', m.description ?? '')
  }

  watch(() => toValue(meta), apply, { immediate: true, deep: true })
}
