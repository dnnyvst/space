import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

export const Earth = () => {
  const meshRef = useRef(null);
  const [dayMap, normalMap] = useTexture([
    "/textures/earth_daymap.jpg",
    "/textures/earth_normal_map.jpg",
  ]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime / 4;
      meshRef.current.rotation.z = clock.elapsedTime / 8;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={dayMap} normalMap={normalMap} />
    </mesh>
  );
};
