import { useBox } from "@react-three/cannon"
import { Box } from "@react-three/drei"
import { useFrame, useThree } from "@react-three/fiber"
import { a } from "@react-spring/three"
import { useStore } from "../store"
import { useCollide } from "../hooks/useCollide"

function Brick({ color = "hotpink", long = false, right = false, speed = 0.1, y = 2 }) {
  const { viewport } = useThree()
  const { width } = viewport
  const [impact, onCollide] = useCollide()
  const [ref, api] = useBox(() => ({ type: "Static", args: [long ? 2.25 : 1.25, 0.75, 1], rotation: [0, 0, right ? 0.1 : -0.1], onCollide }))
  let initial = right ? width : -width
  let x = initial
  useFrame((state, delta) => {
    api.position.set((x = right ? x - speed : x + speed), y, 0)
    if (right ? x + 2 < -width / 2 : x - 2 > width / 2) x = initial
  })

  return (
    <Box receiveShadow castShadow ref={ref} args={[long ? 2.25 : 1.25, 0.75, 1]}>
      <a.meshStandardMaterial color={impact.to([0, 1], [color, "white"])} />
    </Box>
  )
}

export function Bricks() {
  const bricks = useStore((state) => state.bricks)
  return bricks.map((props, i) => <Brick key={i} {...props} />)
}
