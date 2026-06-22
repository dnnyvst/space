"use client";

import { type FC } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  // Noise,
  // HueSaturation,
  // DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import {
  Skybox,
  Planet,
  SunLight,
  HandheldCamera,
  OrbitCamera,
  UIOverlay,
} from "@/components";
import { useAppContext, useIsMobile } from "@/hooks";
import { PLANET_CONFIG } from "@/config";

export const MainCanvas: FC = () => {
  const {
    canvasReady,
    setCanvasReady,
    orbitMode,
    selectedPlanet,
    selectedProperties,
  } = useAppContext();

  const isMobile = useIsMobile(640);

  const selectedPlanetId = selectedPlanet.id;

  const isEarthAtDay =
    selectedPlanetId === "earth" && !selectedProperties.has("night");
  const isEarthAtNight =
    selectedPlanetId === "earth" && selectedProperties.has("night");

  const earthsMoon = PLANET_CONFIG["moon"];

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
        className="w-full h-full"
        gl={{ alpha: true }}
        dpr={[1, 2]}
        onCreated={() => setCanvasReady(true)}
      >
        <Skybox />
        <ambientLight intensity={0.06} />
        {selectedPlanetId !== "sun" && <SunLight natural={isEarthAtDay} />}

        <HandheldCamera />
        {orbitMode && <OrbitCamera />}

        <Planet
          axialTilt={selectedPlanet.tilt}
          retrograde={selectedPlanet.retrograde}
          textures={selectedPlanet.textures}
          textureOverrides={selectedProperties}
          scale={isMobile ? 0.75 : 1}
          speedMultiplier={selectedPlanetId === "sun" ? 0.2 : 1}
          emissive={selectedPlanetId === "sun"}
          noRotation={orbitMode}
        />
        {/* moon test*/}
        {/* <Planet
          axialTilt={earthsMoon.tilt}
          retrograde={earthsMoon.retrograde}
          textures={earthsMoon.textures}
          textureOverrides={selectedProperties}
          scale={0.27}
          noRotation={orbitMode}
          position={[4, 2, -2]}
        /> */}

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
      {selectedPlanetId === "saturn" && (
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
