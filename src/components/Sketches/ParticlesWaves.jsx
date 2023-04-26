import { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Points, PointMaterial, OrbitControls } from '@react-three/drei'
import { inSphere } from "maath/random";

import styles from './Sketches.module.scss';

function Stars(props) {
    const ref = useRef();
    const { camera, mouse } = useThree();

    const [sphere] = useState(() => inSphere(new Float32Array(5000), { radius: 1.5 }))

    useFrame((state, delta) => {
      ref.current.rotation.x -= delta / 10
      ref.current.rotation.y -= delta / 15

      camera.position.x += ( mouse.x - camera.position.x ) * .05;
      camera.position.y += ( - mouse.y - camera.position.y ) * .05;
    })

    return (
      <group rotation={[0, 0, Math.PI / 4]}>
        <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
          <PointMaterial transparent color="#ffa0e0" size={0.005} sizeAttenuation={true} depthWrite={false} />
        </Points>
      </group>
    )
}

const ParticlesWaves = (props) => {
  return (
    <div className={styles.container}>
        <Canvas camera={{ position: [0, 0, 1] }}>
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false}  />
            <Stars />
        </Canvas>
    </div>
  )
}

export default ParticlesWaves