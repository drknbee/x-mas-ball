import React, { useEffect, useRef } from "react"
import { extend, useFrame, useThree } from "@react-three/fiber"
import { ColorCorrectionShader } from "three/examples/jsm/shaders/ColorCorrectionShader"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass"

extend({ EffectComposer, FilmPass, RenderPass, ShaderPass, UnrealBloomPass })

export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => {
    gl.autoClear = true
    composer.current.render()
    gl.autoClear = false
    gl.clearDepth()
  }, 1)

  return (
    <effectComposer args={[gl]} ref={composer}>
      <renderPass attachArray="passes" camera={camera} scene={scene} />
      <unrealBloomPass args={[undefined, 1.4, 1, 0.55]} attachArray="passes" />
      <filmPass attachArray="passes" args={[0, 1, 1000, false]} />
      <shaderPass args={[ColorCorrectionShader]} />
    </effectComposer>
  )
}
