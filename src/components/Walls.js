import { useLayoutEffect } from "react"
import { usePlane } from "@react-three/cannon"
import { useThree } from "@react-three/fiber"
import { useStore } from "../store"
import { useCollide } from "../hooks/useCollide"

export function Walls() {
  const reset = useStore((state) => state.reset)
  const { viewport } = useThree()
  const { width, height } = viewport
  const [, onCollide] = useCollide()
  const [, apiBottom] = usePlane(() => ({ type: "Static", rotation: [-Math.PI / 2, 0, 0], onCollide: reset }))
  const [, apiLeft] = usePlane(() => ({ type: "Static", rotation: [-Math.PI / 2, Math.PI / 2, 0], onCollide }))
  const [, apiRight] = usePlane(() => ({ type: "Static", rotation: [Math.PI / 2, -Math.PI / 2, 0], onCollide }))
  useLayoutEffect(() => {
    apiBottom.position.set(0, -height * 2, 0)
    apiLeft.position.set(-width / 2 - 2, 0, 0)
    apiRight.position.set(width / 2 + 2, 0, 0)
  }, [width, height])
  return null
}
