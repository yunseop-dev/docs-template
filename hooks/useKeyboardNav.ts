// hooks/useKeyboardNav.ts
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function useKeyboardNav(prevHref: string | null, nextHref: string | null) {
  const router = useRouter()

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      // Alt + ← 또는 Alt + →
      if (e.altKey) {
        if (e.key === 'ArrowLeft' && prevHref) {
          router.push(prevHref)
        } else if (e.key === 'ArrowRight' && nextHref) {
          router.push(nextHref)
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [prevHref, nextHref, router])
}