"use client";

import { useMemo, useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { atmosphereMaterial } from "@/shaders";
import type { CelestialBodyTextures } from "@/types";
import { Moon } from "@/components";
import { MOON_CONFIG } from "@/config";
import { useAppContext, useCameraContext } from "@/hooks";

const EMPTY_SHADER = { uniforms: {}, vertexShader: "", fragmentShader: "" };

export interface CelestialBodyProps {
  id: string;
  axialTilt: number;
  retrograde?: boolean;
  textures: CelestialBodyTextures;
  textureOverrides?: Set<string>;
  atmosphereColor?: string;
  scale?: number;
  position?: THREE.Vector3Tuple;
  rotationalSpeed?: number;
  emissive?: boolean;
  noRotation?: boolean;
}

export const CelestialBody: FC<CelestialBodyProps> = ({
  id,
  axialTilt,
  retrograde = false,
  textures,
  textureOverrides = new Set(),
  atmosphereColor = "#e8c082",
  scale = 1,
  rotationalSpeed = 0.1,
  emissive = false,
  noRotation = false,
  position = [0, 0, 0],
}) => {
  const { showOrbitPaths, hoveredMoonId } = useAppContext();
  const { followName } = useCameraContext();

  const mainRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const _axialTilt = THREE.MathUtils.degToRad(axialTilt);

  const loadedTextures = useTexture(
    Object.fromEntries(Object.entries(textures).filter(([, value]) => value)),
  ) as Partial<Record<keyof CelestialBodyTextures, THREE.Texture>>;

  const { map, normal, clouds, atmosphere, ring, night } = loadedTextures;

  let atmosphereShader = EMPTY_SHADER;
  if (atmosphere) {
    atmosphereShader = atmosphereMaterial(atmosphere, atmosphereColor);
  }

  const moons = useMemo(
    () => Object.values(MOON_CONFIG).filter((moon) => moon.parent === id),
    [id],
  );

  useFrame((_, delta) => {
    if (noRotation) {
      return;
    }

    const multipliers = (retrograde ? -1 : 1) * rotationalSpeed;

    if (mainRef.current) {
      mainRef.current.rotation.y += delta * multipliers;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.7 * multipliers;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 3.9 * multipliers;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.1 * multipliers;
    }
  });

  return (
    <group scale={scale} position={position} rotation={[0, 0, _axialTilt]}>
      {/* main */}
      <mesh ref={mainRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        {emissive ? (
          <>
            <meshBasicMaterial
              depthWrite={false}
              map={night && textureOverrides.has("night") ? night : map}
            />
          </>
        ) : (
          <meshStandardMaterial
            key={id}
            map={night && textureOverrides.has("night") ? night : map}
            normalMap={textures.normal && normal ? normal : null}
            normalScale={
              textures.normal && normal ? new THREE.Vector2(8, -8) : undefined
            }
          />
        )}
      </mesh>
      {/* clouds */}
      {clouds && textureOverrides.has("clouds") && (
        <mesh ref={cloudsRef}>
          <sphereGeometry args={[2.03, 64, 64]} />
          <meshStandardMaterial
            map={clouds}
            transparent
            opacity={0.4}
            depthWrite={false}
            blending={THREE.NormalBlending}
          />
        </mesh>
      )}
      {/* atmosphere */}
      {atmosphere && textureOverrides.has("atmosphere") && (
        <>
          <mesh ref={atmosphereRef} renderOrder={10}>
            <sphereGeometry args={[2.08, 64, 64]} />
            <shaderMaterial
              uniforms={atmosphereShader.uniforms}
              vertexShader={atmosphereShader.vertexShader}
              fragmentShader={atmosphereShader.fragmentShader}
              premultipliedAlpha
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
            {/* <meshStandardMaterial
              map={atmosphere}
              transparent
              opacity={0.4}
              depthWrite={false}
            /> */}
          </mesh>
        </>
      )}
      {/* ring */}
      {ring && (
        <mesh ref={ringRef} rotation={[4.9, 0, 0]}>
          <ringGeometry args={[2.3, 2.8, 128]} />
          <meshStandardMaterial
            map={ring}
            // transparent
            // opacity={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
            alphaTest={0.5}
          />
        </mesh>
      )}
      {/* moons */}
      {moons.map((moon) => (
        <group
          key={moon.id}
          rotation={[0, 0, THREE.MathUtils.degToRad(moon.orbitalTilt)]}
        >
          {showOrbitPaths && (
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[moon.orbitRadius, 0.002, 30, 256]} />
              <meshBasicMaterial
                color="#cfc8bb"
                transparent
                opacity={
                  followName === moon.name || hoveredMoonId === moon.id
                    ? 0.6
                    : 0.2
                }
                depthWrite={false}
                depthTest={true}
              />
            </mesh>
          )}
          <Moon parentRef={mainRef} {...moon} />
        </group>
      ))}
    </group>
  );
};
