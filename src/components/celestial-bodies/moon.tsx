import { useEffect, useRef, type FC, type RefObject } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
// import { useOrbit } from "@/hooks";
import { MoonConfig } from "@/types";
import { useFrame } from "@react-three/fiber";

// TODO: should be a prop, different for each moon in config
const ORBIT_SPEED = 0.06;

const FINAL_SCALE = 0.4;

export const Moon: FC<
  MoonConfig & { parentRef: RefObject<THREE.Mesh | null> }
> = ({
  relativeScale,
  relativeSpeed,
  orbitRadius,
  tilt,
  textures,
  parentRef,
}) => {
  const ref = useRef<THREE.Mesh>(null);
  // const angle = useRef(0);
  const phase = useRef(0);

  // random starting point
  useEffect(() => {
    phase.current = Math.random() * Math.PI * 2;
  }, []);

  const map = useTexture(textures.map);

  useFrame((_, delta) => {
    if (!ref.current || !parentRef.current) return;

    // independent rotation
    ref.current.rotation.y += delta * relativeSpeed;

    // orbit
    const center = parentRef.current.position;

    phase.current += delta * ORBIT_SPEED;

    const x = Math.sin(phase.current) * orbitRadius;
    const z = Math.cos(phase.current) * orbitRadius;

    ref.current.position.set(center.x + x, center.y, center.z + z);
  });

  return (
    <>
      <mesh
        ref={ref}
        castShadow
        receiveShadow
        scale={relativeScale * FINAL_SCALE}
        rotation={[0, 0, tilt]}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </>
  );
};
