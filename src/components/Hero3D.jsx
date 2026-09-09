import { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'

const BRAND_BLUE = '#D2DEEB'

// One soft, slowly rotating name, extruded in Instrument Serif. Speed is
// controlled by ROTATION_SPEED below — turn it down to slow it further.
const ROTATION_SPEED = 0.08

function FloatingName({ isVisible }) {
  const groupRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame((state, delta) => {
    if (!isVisible || !groupRef.current) return

    // constant slow spin
    groupRef.current.rotation.y += delta * ROTATION_SPEED

    // gentle easing toward the pointer position — never snaps, just leans
    const { x, y } = state.pointer
    target.current.x += (x * 0.3 - target.current.x) * 0.03
    target.current.y += (y * 0.2 - target.current.y) * 0.03
    groupRef.current.rotation.y += target.current.x * delta
    groupRef.current.rotation.x = target.current.y * 0.25
  })

  return (
    <group ref={groupRef}>
      <Center>
        <Text3D
          font={`${import.meta.env.BASE_URL}fonts/instrument-serif-name.json`}
          size={1}
          height={0.22}
          curveSegments={8}
          bevelEnabled
          bevelThickness={0.03}
          bevelSize={0.02}
          bevelSegments={4}
        >
          Anna Zhang
          <meshStandardMaterial color={BRAND_BLUE} roughness={0.3} metalness={0.05} />
        </Text3D>
      </Center>
    </group>
  )
}

export default function Hero3D() {
  const [isVisible, setIsVisible] = useState(true)

  // Pause the animation loop entirely when the tab is hidden, so it never
  // burns cycles or battery in the background.
  useEffect(() => {
    const handleVisibility = () => setIsVisible(document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <div className="hero3d" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 4, 5]} intensity={0.6} />
        <directionalLight position={[-4, -2, -3]} intensity={0.15} color="#ffffff" />
        <FloatingName isVisible={isVisible} />
      </Canvas>
    </div>
  )
}
