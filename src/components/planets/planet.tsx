import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

interface Textures {
  map: string;
  normal?: string;
  clouds?: string;
  atmosphere?: string;
}

interface PlanetProps {
  axialTilt: number;
  retrograde?: boolean;
  textures: Textures;
}

export const Planet: FC<PlanetProps> = ({
  axialTilt,
  retrograde = false,
  textures,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const _axialTilt = THREE.MathUtils.degToRad(axialTilt);

  const [map, normalMap, cloudsMap, atmosphereMap] = useTexture([
    textures.map,
    textures.normal || textures.map,
    textures.clouds || textures.map,
    textures.atmosphere || textures.map,
  ]);

  useFrame((_, delta) => {
    const direction = retrograde ? -1 : 1;
    planetRef.current!.rotation.y += delta * 0.1 * direction;
    if (!!textures.clouds) {
      cloudsRef.current!.rotation.y += delta * 0.13 * direction;
    }
    if (!!textures.atmosphere) {
      atmosphereRef.current!.rotation.y += delta * 0.39 * direction;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, _axialTilt]}>
      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={map}
          normalMap={textures.normal ? normalMap : undefined}
        />
      </mesh>

      {/* Clouds */}
      {textures.clouds && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.03, 64, 64]} />
          <meshStandardMaterial
            map={cloudsMap}
            transparent
            opacity={0.4}
            depthWrite={false}
          />
        </mesh>
      )}

      {/* Atmosphere */}
      {textures.atmosphere && (
        <>
          <mesh ref={atmosphereRef}>
            <sphereGeometry args={[2.08, 64, 64]} />
            <meshStandardMaterial
              map={atmosphereMap}
              transparent
              opacity={0.5}
              depthWrite={false}
            />
          </mesh>
          {/* Glow shell */}
          {/* <mesh>
            <sphereGeometry args={[2.12, 64, 64]} />
            <meshBasicMaterial
              color="#f6d2a2"
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh> */}
        </>
      )}
    </group>
  );
};
