import { useRef, type FC, type RefObject } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
// import { useOrbit } from "@/hooks";
import { MoonConfig } from "@/types";
import { useFrame } from "@react-three/fiber";
import { PLANET_CONFIG } from "@/config";
import { sceneTime } from "@/utils";
import { useCameraContext } from "@/hooks";

// For now, increase the speed so it's more obvious
const ROTATIONAL_SPEED_MULTIPLIER = 10;

const ORBITAL_SPEED_SCALE = 0.4;

const FINAL_SIZE_SCALE = 0.4;

export const Moon: FC<
  MoonConfig & { parentRef: RefObject<THREE.Mesh | null> }
> = ({
  parent,
  relativeScale,
  relativeRotationalSpeed,
  orbitRadius,
  orbitPhase,
  orbitalSpeed,
  axialTilt,
  textures,
  parentRef,
}) => {
  const { followRef, activeCamera, setActiveCamera } = useCameraContext();

  const ref = useRef<THREE.Mesh>(null);

  const map = useTexture(textures.map);

  useFrame((_, delta) => {
    if (!ref.current || !parentRef.current) return;

    // independent rotation
    ref.current.rotation.y +=
      delta *
      PLANET_CONFIG[parent].rotationalSpeed *
      relativeRotationalSpeed *
      ROTATIONAL_SPEED_MULTIPLIER;

    // orbit, using global scene time
    const center = parentRef.current.position;

    let phase =
      orbitPhase + sceneTime.get() * orbitalSpeed * ORBITAL_SPEED_SCALE;

    // TODO - temporary special scale for jupiters moons
    if (parent === "jupiter") {
      phase /= 3;
    }
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
        scale={relativeScale * FINAL_SIZE_SCALE}
        rotation={[0, 0, axialTilt]}
        onPointerUp={() => {
          if (ref.current && followRef) {
            if (
              followRef.current === ref.current &&
              activeCamera === "follow"
            ) {
              setActiveCamera("handheld");
            } else {
              followRef.current = ref.current;
              setActiveCamera("follow");
            }
          }
        }}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} />
      </mesh>
    </>
  );
};
