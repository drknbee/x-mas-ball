import React from "react"
import { Text } from "@react-three/drei"
import { useThree } from "@react-three/fiber"

export const StyledText = React.forwardRef(
  ({ anchorX = "center", anchorY = "middle", children, colorShadow, fontSize = 1, lineHeight = 1, offset = 0.25, textAlign = "justify", ...props }, ref) => {
    const { viewport } = useThree()
    const textProps = {
      anchorX,
      anchorY,
      children,
      fontSize,
      lineHeight,
      maxWidth: viewport.width,
      "material-depthTest": false,
    }
    return (
      <group ref={ref} {...props}>
        <Text color={colorShadow} position-z={-offset} {...textProps} />
        <Text color="white" {...textProps} />
      </group>
    )
  },
)
