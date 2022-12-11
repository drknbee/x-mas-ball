import { useCallback } from "react"
import { useSpring } from "@react-spring/three"
import { useStore } from "../store"

export function useCollide(onColide) {
  const contact = useStore((state) => state.contact)
  const [{ impact }, set] = useSpring({ impact: 0 }, [])
  const event = useCallback((e) => {
    set({ impact: 10, config: { immediate: true } })
    requestAnimationFrame(() => set({ impact: 0 }))
    if (onColide) onColide(e)
    contact(e)
  }, [])

  return [impact, event]
}
