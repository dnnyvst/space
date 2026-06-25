import { useMemo, useRef, useState, type FC, type RefObject } from "react";
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
  const tubeMeshRef = useRef<THREE.Mesh>(null); // Ref to dynamically move the tube
  const [hovered, setHovered] = useState<boolean>(false);

  useCursor(hovered, "zoom-in");
  const beingFollowed = activeCamera === "follow" && followName === id;
  const map = useTexture(textures.map);

  useFrame((_, delta) => {
    if (!ref.current || !parentRef.current) return;

    const center = parentRef.current.position;

    // 1. Position the tube mesh perfectly at the parent's center
    if (tubeMeshRef.current) {
      tubeMeshRef.current.position.copy(center);
    }

    // independent rotation
    ref.current.rotation.y +=
      delta *
      PLANET_CONFIG[parent].rotationalSpeed *
      relativeRotationalSpeed *
      ROTATIONAL_SPEED_MULTIPLIER;

    // orbit, using global scene time
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

  const tubePath = useMemo(() => {
    // Dynamically match the orbitRadius passed from props
    const radius = orbitRadius;

    // 1. Create a 2D circle curve
    const curve = new THREE.EllipseCurve(
      0,
      0,
      radius,
      radius,
      0,
      2 * Math.PI,
      false,
      0,
    );

    // 2. Extract 2D points and map to 3D Vector3 space (X, 0, Z)
    const points2d = curve.getPoints(64); // Bumped to 64 for a smoother circle
    const points3d = points2d.map((p) => new THREE.Vector3(p.x, 0, p.y));

    // 3. Generate continuous closed 3D curve
    const path = new THREE.CatmullRomCurve3(points3d, true);
    return path;
  }, [orbitRadius]); // Recalculate only if the radius changes

  return (
    <group>
      {/* 
        The Tube Orbit Line 
        Mapped with a ref so it tracks the parent mesh position inside useFrame
      */}
      <mesh ref={tubeMeshRef}>
        {/* Adjusted tubeRadius from 0.5 to 0.05 for an elegant orbit line look */}
        <tubeGeometry
          args={[
            tubePath,
            128,
            0.01 * relativeScale * FINAL_SIZE_SCALE * (hovered ? 2 : 1),
            8,
            true,
          ]}
        />
        <meshBasicMaterial
          color="white"
          transparent
          opacity={hovered ? 1 : 0.2}
          depthTest={true}
          depthWrite={true}
        />
      </mesh>

      <group name={name} ref={ref} scale={relativeScale * FINAL_SIZE_SCALE}>
        <Billboard visible={hovered || beingFollowed}>
          <Float speed={4} enabled={hovered || beingFollowed}>
            <Text
              key={id}
              color="#cfc8bb"
              anchorX="center"
              anchorY={name === "moon" ? -3.4 : -3.8}
              font="/fonts/GeistMono-Regular.ttf"
              raycast={undefined}
              fontSize={name === "moon" ? 0.8 : 1}
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
    </group>
  );
};
