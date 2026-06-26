import { useMemo, useRef, type FC, type RefObject } from "react";
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

const FINAL_SIZE_SCALE = 0.4;
const ROTATION_SPEED_SCALE = 0.005;
const ORBIT_SPEED_SCALE = 0.4;
const ORBIT_RADIUS_SCALE = 4;
const ORBIT_GAP_SCALE = 0.18;

export const Moon: FC<
  MoonConfig & { parentRef: RefObject<THREE.Mesh | null> }
> = ({
  id,
  name,
  parent,
  radius,
  rotationalSpeed,
  orbitRadius,
  orbitPhase,
  orbitalSpeed,
  axialTilt,
  textures,
  parentRef,
  retrograde,
  orbitalTilt,
}) => {
  const { showOrbitPaths, hoveredMoonId, setHoveredMoonId } = useAppContext();
  const hovered = hoveredMoonId === id;

  const { activeCamera, followName, setActiveCamera, setFollowName } =
    useCameraContext();
  const ref = useRef<THREE.Mesh>(null);

  useCursor(hovered, "zoom-in");
  const beingFollowed = activeCamera === "follow" && followName === name;
  const map = useTexture(textures.map);

  const scale = useMemo(
    () => (radius / PLANET_CONFIG[parent].radius) * FINAL_SIZE_SCALE,
    [parent, radius],
  );

  const _rotationalSpeed = useMemo(
    () => rotationalSpeed * ROTATION_SPEED_SCALE,
    [rotationalSpeed],
  );

  // squish radii so nothings too crazy far away
  const _orbitRadius =
    Math.pow(orbitRadius, ORBIT_GAP_SCALE) * ORBIT_RADIUS_SCALE;

  useFrame((_, delta) => {
    if (!ref.current || !parentRef.current) return;

    const center = parentRef.current.position;

    // independent rotation
    ref.current.rotation.y += delta * _rotationalSpeed;

    // orbit, using global scene time
    let phase =
      orbitPhase +
      sceneTime.get() *
        orbitalSpeed *
        ORBIT_SPEED_SCALE *
        (retrograde ? -1 : 1);

    // todo - temporary special scale for jupiters moons
    if (parent === "jupiter") {
      phase /= 3;
    }

    ref.current.position.set(
      center.x + Math.sin(phase) * _orbitRadius,
      center.y,
      center.z + Math.cos(phase) * _orbitRadius,
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
    <group rotation={[0, 0, THREE.MathUtils.degToRad(orbitalTilt)]}>
      <group name={name} ref={ref} scale={scale}>
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
        {/* main */}
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
      {/* orbit path */}
      {showOrbitPaths && (
        <group rotation={[Math.PI / 2, 0, 0]}>
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
            <torusGeometry args={[_orbitRadius, 0.036, 30, 256]} />
            <meshBasicMaterial
              transparent
              opacity={0}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
          {/* main */}
          <mesh>
            <torusGeometry args={[_orbitRadius, 0.002, 30, 256]} />
            <meshBasicMaterial
              color="#cfc8bb"
              transparent
              opacity={hovered || beingFollowed ? 0.6 : 0.2}
              depthWrite={false}
              depthTest={true}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};
