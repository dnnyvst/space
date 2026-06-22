"use client";

import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import type { PlanetTextures } from "@/types";
import { atmosphereMaterial } from "@/components";

const EMPTY_SHADER = { uniforms: {}, vertexShader: "", fragmentShader: "" };

interface PlanetProps {
  axialTilt: number;
  retrograde?: boolean;
  textures: PlanetTextures;
  textureOverrides?: Set<string>;
  scale?: number;
  speedMultiplier?: number;
  emissive?: boolean;
  noRotation?: boolean;
}

export const Planet: FC<PlanetProps> = ({
  axialTilt,
  retrograde = false,
  textures,
  textureOverrides = new Set(),
  scale = 1,
  speedMultiplier = 1,
  emissive = false,
  noRotation = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const _axialTilt = THREE.MathUtils.degToRad(axialTilt);

  const loadedTextures = useTexture(
    Object.fromEntries(Object.entries(textures).filter(([, value]) => value)),
  ) as Partial<Record<keyof PlanetTextures, THREE.Texture>>;

  const { map, normal, clouds, atmosphere, ring, night } = loadedTextures;

  let atmosphereShader = EMPTY_SHADER;
  if (atmosphere) {
    atmosphereShader = atmosphereMaterial(atmosphere, "#e8c082");
  }

  useFrame((_, delta) => {
    if (noRotation) {
      return;
    }

    const direction = (retrograde ? -1 : 1) * speedMultiplier;
    if (planetRef.current) {
      planetRef.current.rotation.y += delta * 0.1 * direction;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y += delta * 0.07 * direction;
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
      {/* planet */}
      <mesh ref={planetRef}>
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
            map={night && textureOverrides.has("night") ? night : map}
            normalMap={textures.normal ? normal : null}
            normalScale={normal ? new THREE.Vector2(8, -8) : undefined}
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
    </group>
  );
};
