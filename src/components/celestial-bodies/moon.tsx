import { useRef, useState, type FC, type RefObject } from "react";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import {
  useTexture,
  useCursor,
  Outlines,
  Billboard,
  Text,
  Float,
} from "@react-three/drei";
import { MoonConfig } from "@/types";
import { PLANET_CONFIG } from "@/config";
import { sceneTime } from "@/utils";
import { useCameraContext } from "@/hooks";

// for now, increase the speed so it's more obvious
const ROTATIONAL_SPEED_MULTIPLIER = 10;

const ORBITAL_SPEED_SCALE = 0.4;

const FINAL_SIZE_SCALE = 0.4;

export const Moon: FC<
  MoonConfig & { parentRef: RefObject<THREE.Mesh | null> }
> = ({
  id,
  name,
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
  const { activeCamera, followName, setActiveCamera, setFollowName } =
    useCameraContext();

  const ref = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState<boolean>(false);
  useCursor(hovered, "zoom-in");

  const beingFollowed = activeCamera === "follow" && followName === id;

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

    // todo - temporary special scale for jupiters moons
    if (parent === "jupiter") {
      phase /= 3;
    }
    const x = Math.sin(phase) * orbitRadius;
    const z = Math.cos(phase) * orbitRadius;

    ref.current.position.set(center.x + x, center.y, center.z + z);
  });

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (beingFollowed) {
      setActiveCamera("handheld");
    } else {
      setFollowName(name);
      setActiveCamera("follow");
    }
    setHovered(false);
  };

  return (
    <group name={name} ref={ref} scale={relativeScale * FINAL_SIZE_SCALE}>
      {(hovered || beingFollowed) && (
        <Billboard>
          <Float speed={4}>
            <Text
              key={id}
              color="#cfc8bb"
              anchorX="center"
              anchorY={name === "moon" ? -3.4 : -3.8}
              font="/fonts/GeistMono-Regular.ttf"
              raycast={undefined}
              fontSize={name === "moon" ? 0.8 : 1}
              letterSpacing={0.02}
            >
              {name}
            </Text>
          </Float>
        </Billboard>
      )}

      {/* invisible selection mesh */}
      <mesh
        onPointerEnter={() => {
          if (!beingFollowed) {
            setHovered(true);
          }
        }}
        onPointerLeave={() => setHovered(false)}
        onPointerUp={handleClick}
      >
        <sphereGeometry args={[3, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh castShadow receiveShadow rotation={[0, 0, axialTilt]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={map} />
        <Outlines
          thickness={4}
          color="#cfc8bb"
          transparent
          opacity={hovered ? 1 : 0}
        />
      </mesh>
    </group>
  );
};
