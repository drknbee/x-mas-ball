import { useEffect } from "react"
import { useSphere } from "@react-three/cannon"
import { Sphere } from "@react-three/drei"
import { useStore } from "../store"

export function Ball() {
  const [ref, api] = useSphere(() => ({
    args: 0.4,
    mass: 1,
    position: [0, 3, 0],
    velocity: [0, 5, 0],
  }))
  const restart = useStore((state) => state.restart)
  useEffect(() => {
    if (restart) {
      api.angularVelocity.set(0, 0, 0)
      api.position.set(0, 3, 0)
      api.velocity.set(0, 5, 0)
    }
  }, [restart])

  return (
    <Sphere args={[0.4, 64, 64]} castShadow ref={ref}>
      <meshStandardMaterial />
    </Sphere>
  )
}
