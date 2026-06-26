import { useRef, type FC, type RefObject } from "react";
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
import { useAppContext, useCameraContext } from "@/hooks";

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
  retrograde,
}) => {
  const { hoveredMoonId, setHoveredMoonId } = useAppContext();
  const hovered = hoveredMoonId === id;

  const { activeCamera, followName, setActiveCamera, setFollowName } =
    useCameraContext();
  const ref = useRef<THREE.Mesh>(null);

  useCursor(hovered, "zoom-in");
  const beingFollowed = activeCamera === "follow" && followName === id;
  const map = useTexture(textures.map);

  useFrame((_, delta) => {
    if (!ref.current || !parentRef.current) return;

    const center = parentRef.current.position;

    // independent rotation
    ref.current.rotation.y +=
      delta *
      PLANET_CONFIG[parent].rotationalSpeed *
      relativeRotationalSpeed *
      ROTATIONAL_SPEED_MULTIPLIER;

    // orbit, using global scene time
    let phase =
      orbitPhase +
      sceneTime.get() *
        orbitalSpeed *
        ORBITAL_SPEED_SCALE *
        (retrograde ? -1 : 1);

    // todo - temporary special scale for jupiters moons
    if (parent === "jupiter") {
      phase /= 3;
    }

    ref.current.position.set(
      center.x + Math.sin(phase) * orbitRadius,
      center.y,
      center.z + Math.cos(phase) * orbitRadius,
    );
  });

  const handleClick = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (beingFollowed) {
      setActiveCamera("handheld");
    } else {
      setFollowName(name);
      setActiveCamera("follow");
    }
    setHoveredMoonId(null);
  };

  return (
    <group name={name} ref={ref} scale={relativeScale * FINAL_SIZE_SCALE}>
      <Billboard visible={hovered || beingFollowed}>
        <Float speed={4} enabled={hovered || beingFollowed}>
          <Text
            key={id}
            color="#cfc8bb"
            anchorX="center"
            anchorY={name === "moon" ? -3.2 : -3.8}
            font="/fonts/GeistMono-Regular.ttf"
            raycast={undefined}
            fontSize={name === "moon" ? 0.6 : 1}
            letterSpacing={0.02}
            visible={hovered || beingFollowed}
          >
            {name}
          </Text>
        </Float>
      </Billboard>

      {/* invisible selection mesh */}
      <mesh
        onPointerEnter={() => {
          if (!beingFollowed) {
            setHoveredMoonId(id);
          }
        }}
        onPointerLeave={() => setHoveredMoonId(null)}
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
