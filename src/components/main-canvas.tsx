"use client";

import { type FC } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  // Noise,
  // HueSaturation,
  // DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { Skybox, CelestialBody, UIOverlay } from "@/components";
import { CameraController } from "@/cameras";
import { SunLight } from "@/lights";
import { CELESTIAL_BODY_CONFIG } from "@/config";
import { SceneTimeDriver } from "@/utils";
import { useAppContext, useCameraContext, useIsMobile } from "@/hooks";

export const MainCanvas: FC = () => {
  const {
    canvasReady,
    setCanvasReady,
    selectedCelestialBodyId,
    selectedProperties,
  } = useAppContext();
  const { activeCamera, setActiveCamera } = useCameraContext();

  const isMobile = useIsMobile(640);

  const selectedCelestialBody = CELESTIAL_BODY_CONFIG[selectedCelestialBodyId];

  const isEarthAtDay =
    selectedCelestialBodyId === "earth" && !selectedProperties.has("night");
  const isEarthAtNight =
    selectedCelestialBodyId === "earth" && selectedProperties.has("night");

  // const earthsMoon = MOON_CONFIG["moon"];

  return (
    <div className="fixed inset-0 overflow-hidden font-mono text-text">
      {/* loading */}
      {!canvasReady && (
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          loading...
        </div>
      )}
      {/* ui overlay */}
      {canvasReady && <UIOverlay />}
      {/* canvas (full screen) */}
      <Canvas
        onPointerMissed={() => {
          if (activeCamera === "follow") {
            setActiveCamera("handheld");
          }
        }}
        className="w-full h-full"
        gl={{
          alpha: true,
        }}
        dpr={[1, 2]}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.VSMShadowMap;
          setCanvasReady(true);
        }}
      >
        <Skybox />
        <SceneTimeDriver />
        <CameraController />

        <ambientLight intensity={0.06} />
        {selectedCelestialBodyId !== "sun" && (
          <SunLight natural={isEarthAtDay} />
        )}

        <CelestialBody
          id={selectedCelestialBodyId}
          axialTilt={selectedCelestialBody.axialTilt}
          retrograde={selectedCelestialBody.retrograde}
          textures={selectedCelestialBody.textures}
          textureOverrides={selectedProperties}
          scale={isMobile ? 0.75 : 1}
          // speedMultiplier={selectedCelestialBodyId === "sun" ? 0.2 : 1}
          rotationalSpeed={selectedCelestialBody.rotationalSpeed}
          emissive={selectedCelestialBodyId === "sun"}
          noRotation={activeCamera === "orbit"}
        />

        {/* postprocessing */}
        <EffectComposer>
          {/* <Noise opacity={0.08} /> */}
          {/* <HueSaturation saturation={-0.1} /> */}
          {/* <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={2}
            height={480}
          /> */}
          <Bloom
            intensity={isEarthAtNight ? 5 : 1}
            luminanceThreshold={isEarthAtNight ? 0.1 : 0.2}
            luminanceSmoothing={0.6}
          />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
        </EffectComposer>
      </Canvas>
      {/* saturn construction overlay */}
      {selectedCelestialBodyId === "saturn" && (
        <div className="absolute inset-0 flex justify-center items-center text-black">
          under construction.
          <br />
          <br />
          rings are too hard.
        </div>
      )}
    </div>
  );
};
