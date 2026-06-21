import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export const Skybox = () => {
  const gl = useThree((s) => s.gl);

  const starTexture = useTexture("/8k_stars_milky_way.jpg", (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();
  });

  return (
    <mesh>
      <sphereGeometry args={[250, 64, 64]} />
      <meshBasicMaterial
        map={starTexture}
        side={THREE.BackSide}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
};
