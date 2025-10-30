import { useMemo } from 'react'

// Minimal hook to match required API: { t, isRTL }
export function useLanguage() {
  const isRTL = typeof document !== 'undefined' && (
    document.documentElement.dir === 'rtl' ||
    (document.documentElement.lang || '').toLowerCase().startsWith('ar')
  )

  const t = useMemo(() => {
    return (_key, en, ar) => (isRTL ? (ar ?? en) : en)
  }, [isRTL])

  return { t, isRTL }
}

