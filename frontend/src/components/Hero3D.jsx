import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, MeshDistortMaterial } from '@react-three/drei'

// The signature element: a slowly rotating brass-toned "ribbon" torus knot,
// standing in for VELARA's monogram mark. Kept quiet and slow rather than
// flashy — an ambient presence behind the hero copy, not a centerpiece.
function RibbonMark() {
  const ref = useRef()

  useFrame((_, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * 0.08
    ref.current.rotation.y += delta * 0.14
  })

  return (
    <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={ref} scale={1.5}>
        <torusKnotGeometry args={[1, 0.28, 220, 32, 2, 3]} />
        <MeshDistortMaterial
          color="#B08D57"
          metalness={0.75}
          roughness={0.25}
          distort={0.12}
          speed={1.2}
        />
      </mesh>
    </Float>
  )
}

export default function Hero3D() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={1.4} />
        <Suspense fallback={null}>
          <RibbonMark />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  )
}
