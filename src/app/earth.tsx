import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const AXIAL_TILT = THREE.MathUtils.degToRad(23.44);

export const Earth = () => {
  const groupRef = useRef();
  const meshRef = useRef(null);
  const [dayMap, normalMap] = useTexture([
    "/textures/earth_daymap.jpg",
    "/textures/earth_normal_map.jpg",
  ]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, AXIAL_TILT]}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={dayMap}
          normalMap={normalMap}
          normalScale={[0.6, 0.6]}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  );
};
