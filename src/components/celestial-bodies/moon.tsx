import { useRef, type FC } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
// import { useOrbit } from "@/hooks";
import { MoonConfig } from "@/types";
import { useFrame } from "@react-three/fiber";

export const Moon: FC<MoonConfig> = ({
  initialPosition,
  relativeScale,
  relativeSpeed,
  tilt,
  textures,
  name,
  parent,
}) => {
  console.log(`moon name: ${name}, parent: ${parent}`);
  const map = useTexture(textures.map);

  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * relativeSpeed;
  });

  return (
    <>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        position={initialPosition}
        scale={relativeScale}
        rotation={[0, 0, tilt]}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </>
  );
};
