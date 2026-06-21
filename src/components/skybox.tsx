import * as THREE from "three";
import { useTexture } from "@react-three/drei";

export const Skybox = () => {
  const starTexture = useTexture("/8k_stars_milky_way.jpg");

  return (
    <mesh>
      <boxGeometry args={[500, 500, 500]} />
      <meshBasicMaterial map={starTexture} side={THREE.BackSide} />
    </mesh>
  );
};
