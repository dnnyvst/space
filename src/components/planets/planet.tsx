"use client";

import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { PlanetTextures } from "@/types";

interface PlanetProps {
  axialTilt: number;
  retrograde?: boolean;
  textures: PlanetTextures;
  textureOverrides?: Set<string>;
  scale?: number;
  speedMultiplier?: number;
  emissive?: boolean;
}

export const Planet: FC<PlanetProps> = ({
  axialTilt,
  retrograde = false,
  textures,
  textureOverrides = new Set(),
  scale = 1,
  speedMultiplier = 1,
  emissive = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const _axialTilt = THREE.MathUtils.degToRad(axialTilt);

  const [map, normalMap, cloudsMap, atmosphereMap, ringMap, nightMap] =
    useTexture(
      [
        textures.map,
        textures.normal || textures.map,
        textures.clouds || textures.map,
        textures.atmosphere || textures.map,
        textures.ring || textures.map,
        textures.night || textures.map,
      ]
      // (textures) => {
      //   const ring = textures[4];

      //   if (ring) {
      //     ring.center.set(0.5, 0.5);
      //     ring.repeat.y = -1;
      //     ring.rotation = Math.PI / 2;
      //   }
      // }
    );

  useFrame((_, delta) => {
    const direction = (retrograde ? -1 : 1) * speedMultiplier;

    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.1 * direction;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.13 * direction;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += delta * 0.39 * direction;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.01 * direction;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, _axialTilt]} scale={scale}>
      {/* Planet */}
      <mesh ref={planetRef}>
        <sphereGeometry args={[2, 64, 64]} />
        {emissive ? (
          <>
            <meshBasicMaterial
              depthWrite={false}
              map={textureOverrides.has("night") ? nightMap : map}
            />
            <mesh>
              <sphereGeometry args={[2.15, 64, 64]} />
              <meshBasicMaterial
                color="#ffb347"
                transparent
                opacity={0.06}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
            <mesh>
              <sphereGeometry args={[2.3, 64, 64]} />
              <meshBasicMaterial
                color="#ff9a3d"
                transparent
                opacity={0.04}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </>
        ) : (
          <meshStandardMaterial
            map={textureOverrides.has("night") ? nightMap : map}
            normalMap={textures.normal ? normalMap : undefined}
            normalScale={new THREE.Vector2(8, -8)}
          />
        )}
      </mesh>

      {/* Clouds */}
      {textures.clouds && textureOverrides.has("clouds") && (
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
      {textures.atmosphere && textureOverrides.has("atmosphere") && (
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
      {/* Ring */}
      {textures.ring && (
        <mesh ref={ringRef} rotation={[4.9, 0, 0]}>
          <ringGeometry args={[2.3, 2.8, 128]} />
          <meshStandardMaterial
            map={ringMap}
            // transparent
            // opacity={0.9}
            side={THREE.DoubleSide}
            depthWrite={false}
            alphaTest={0.5}
          />
        </mesh>
      )}
    </group>
  );
};
