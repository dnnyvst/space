import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

interface Textures {
  map: string;
  normal: string;
  clouds: string;
}

interface PlanetProps {
  axialTilt: number;
  textures: Textures;
}

export const Planet: FC<PlanetProps> = ({ axialTilt, textures }) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const _axialTilt = THREE.MathUtils.degToRad(axialTilt);

  const [map, normalMap, cloudsMap] = useTexture([
    textures.map,
    textures.normal,
    textures.clouds,
  ]);

  useFrame((state, delta) => {
    planetRef.current!.rotation.y += delta * 0.1;
    cloudsRef.current!.rotation.y += delta * 0.13;

    groupRef.current!.rotation.z =
      _axialTilt + Math.sin(state.clock.elapsedTime * 0.1) * 0.002;
  });

  return (
    <group ref={groupRef} rotation={[_axialTilt, 0, 0]}>
      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} normalMap={normalMap} />
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
