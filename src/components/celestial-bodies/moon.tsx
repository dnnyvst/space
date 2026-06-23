import { useRef, type FC, type RefObject } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
// import { useOrbit } from "@/hooks";
import { MoonConfig } from "@/types";
import { useFrame } from "@react-three/fiber";
import { sceneTime } from "@/utils";

// TODO: should be a prop, different for each moon in config
const ORBIT_SPEED = 0.06;

const FINAL_SCALE = 0.4;

export const Moon: FC<
  MoonConfig & { parentRef: RefObject<THREE.Mesh | null> }
> = ({
  relativeScale,
  relativeSpeed,
  orbitRadius,
  axialTilt,
  textures,
  parentRef,
  orbitPhase,
}) => {
  const ref = useRef<THREE.Mesh>(null);

  const map = useTexture(textures.map);

  useFrame((_, delta) => {
    if (!ref.current || !parentRef.current) return;

    // independent rotation
    ref.current.rotation.y += delta * relativeSpeed;

    // orbit, using global scene time
    const center = parentRef.current.position;

    const phase = orbitPhase + sceneTime.get() * ORBIT_SPEED;

    const x = Math.sin(phase) * orbitRadius;
    const z = Math.cos(phase) * orbitRadius;

    ref.current.position.set(center.x + x, center.y, center.z + z);
  });

  return (
    <>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        scale={relativeScale * FINAL_SCALE}
        rotation={[0, 0, axialTilt]}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </>
  );
};
