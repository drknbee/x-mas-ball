import { useBox } from "@react-three/cannon"
import { Box } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { a } from "@react-spring/three"
import { useCollide } from "../hooks/useCollide"

export function Paddle() {
  const { viewport } = useThree()
  const { width, height } = viewport
  const [impact, onCollide] = useCollide()
  const [ref, api] = useBox(() => ({ type: "Kinematic", args: [2.25, 0.75, 1], onCollide }))
  useFrame((state) => {
    api.position.set(state.mouse.x * (width / 2 + 2), -height / 2.5, 0)
    api.rotation.set(0, 0, (state.mouse.x * Math.PI) / 5)
  })
  return (
    <Box args={[2.25, 0.75, 1]} castShadow receiveShadow ref={ref}>
      <a.meshStandardMaterial color={impact.to([0, 1], ["gold", "white"])} />
    </Box>
  )
}
