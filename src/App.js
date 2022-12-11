import React, { Suspense, useRef, useState } from "react"
import * as THREE from "three"
import { Physics } from "@react-three/cannon"
import { OrthographicCamera, Plane, useAspect } from "@react-three/drei"
import { Canvas, createPortal, useFrame, useLoader, useThree } from "@react-three/fiber"
import { useStore } from "./store"
import Effects from "./Effects"
import { Ball } from "./components/Ball"
import { Bricks } from "./components/Bricks"
import { Heart } from "./components/Heart"
import { Paddle } from "./components/Paddle"
import { StyledText } from "./components/StyledText"
import { Walls } from "./components/Walls"
import bgImg from "./resources/x-mas-pixel.jpg"

function Bg() {
  const scale = useAspect(1286, 574, 1.5)
  const texture = useLoader(THREE.TextureLoader, bgImg)

  return <Plane scale={scale} material-map={texture} />
}

function Startup() {
  const ref = useRef()
  useFrame((state) => {
    const s = 1 + 0.01 * (1 + Math.sin(state.clock.getElapsedTime() * 2)) * 2
    ref.current.scale.set(s, s, s)
  })

  return <StyledText children={"Happy\nNew Year!"} colorShadow={"#eb4034"} fontSize={1.5} position={[0, 2, 1]} ref={ref} />
}

function Status() {
  const [virtualScene] = useState(() => new THREE.Scene())
  const virtualCamera = useRef()
  const points = useStore((state) => state.points)
  const { viewport } = useThree()
  const { width, height } = viewport.getCurrentViewport(virtualCamera.current)
  const hearts = useStore((state) => state.hearts)
  const gameover = useStore((state) => state.gameover)
  if (hearts === 0) gameover()

  useFrame((state) => state.gl.render(virtualScene, virtualCamera.current), 2)

  return createPortal(
    <>
      <OrthographicCamera position={[0, 0, 10]} zoom={100} ref={virtualCamera} />
      <group position={[0, height / 2 - 1, 0]}>
        <StyledText anchorX="left" anchorY="middle" children={String(points)} fontSize={0.75} offset={0.1} position={[-width / 2 + 0.75, 0, 0]} />
        {hearts === 1 && <Heart position={[width / 2 - 1, 0, 0]} />}
        {hearts === 2 && (
          <>
            <Heart position={[width / 2 - 1, 0, 0]} />
            <Heart position={[width / 2 - 2, 0, 0]} />
          </>
        )}
        {hearts === 3 && (
          <>
            <Heart position={[width / 2 - 1, 0, 0]} />
            <Heart position={[width / 2 - 2, 0, 0]} />
            <Heart position={[width / 2 - 3, 0, 0]} />
          </>
        )}
      </group>
    </>,
    virtualScene,
  )
}

function Perspective() {
  return useFrame((state) => {
    state.camera.position.x = THREE.Math.lerp(state.camera.position.x, state.mouse.x * 2, 0.1)
    state.camera.updateProjectionMatrix()
  })
}

export default function App() {
  const startup = useStore((state) => state.startup)
  const start = useStore((state) => state.start)

  return (
    <div onClick={start}>
      <Canvas camera={{ position: [0, 5, 12], fov: 50 }} dpr={0.25} gl={{ antialias: false, alpha: false }} shadows>
        <ambientLight intensity={0.3} />
        <directionalLight castShadow position={[10, 10, 5]} />
        <pointLight position={[-10, -10, -10]} />
        {!startup && (
          <Physics defaultContactMaterial={{ restitution: 1.07, contactEquationRelaxation: 10 }} gravity={[0, -30, 0]}>
            <Walls />
            <Ball />
            <Paddle />
            <Bricks />
          </Physics>
        )}
        <Status />
        {startup && <Startup />}
        <Suspense fallback={null}>
          <Bg />
        </Suspense>
        <Perspective />
        <Effects />
      </Canvas>
    </div>
  )
}
