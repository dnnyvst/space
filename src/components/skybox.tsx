import { useRef } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";

export const Skybox = () => {
  const { camera } = useThree();
  const meshRef = useRef<THREE.Mesh>(null!);

  const starTexture = useTexture("/8k_stars_milky_way.jpg", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = 16;
  });

  useFrame(() => {
    meshRef.current.position.copy(camera.position);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[4750, 64, 64]} />
      <meshBasicMaterial
        map={starTexture}
        side={THREE.BackSide}
        toneMapped={false}
        depthWrite={false}
      />
    </mesh>
  );
};
