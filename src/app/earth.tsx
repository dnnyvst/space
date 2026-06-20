import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const AXIAL_TILT = THREE.MathUtils.degToRad(23.44);

export const Earth = () => {
  const groupRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [dayMap, normalMap, cloudsMap] = useTexture([
    "/textures/earth_daymap.jpg",
    "/textures/earth_normal_map.jpg",
    "/textures/earth_clouds.jpg",
  ]);

  useFrame((state, delta) => {
    earthRef.current!.rotation.y += delta * 0.1;
    cloudsRef.current!.rotation.y += delta * 0.13;

    groupRef.current!.rotation.z =
      AXIAL_TILT + Math.sin(state.clock.elapsedTime * 0.1) * 0.002;
  });

  return (
    <group ref={groupRef} rotation={[AXIAL_TILT, 0, 0]}>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={dayMap} normalMap={normalMap} />
      </mesh>

      {/* Clouds */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[2.03, 64, 64]} />
        <meshStandardMaterial
          map={cloudsMap}
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};
