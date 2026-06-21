"use client";

import { useState, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import {
  EffectComposer,
  Noise,
  HueSaturation,
  DepthOfField,
  Bloom,
  Vignette,
} from "@react-three/postprocessing";
import { useMediaQuery } from "usehooks-ts";
import { Planet, SunLight, FlyByCamera } from "@/components";
import { PLANET_CONFIG } from "@/config";

export const MainCanvas: FC = () => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    new Set(["clouds", "atmosphere"])
  );

  const selectedPlanet = PLANET_CONFIG[selectedPlanetId];

  const toggleTextures = Object.fromEntries(
    Object.entries(selectedPlanet.textures).filter(
      ([key, value]) => !["map", "normal", "ring"].includes(key) && value
    )
  );

  return (
    <div className="fixed inset-0 overflow-hidden font-mono bg-[url(/stars_milky_way.jpg)]">
      {/* UI overlay*/}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-10 w-3/4 md:w-min">
        {/* planet select */}
        <div className="flex flex-wrap md:flex-nowrap gap-3 md:gap-6 bg-black border border-white/30 py-2 px-4 rounded-lg">
          {Object.values(PLANET_CONFIG).map(({ id, name }) => (
            <button
              key={id}
              className={`cursor-pointer transition-all duration-300 ease-out ${
                id === selectedPlanetId
                  ? "underline underline-offset-4 decoration-2 opacity-100"
                  : "opacity-30 hover:opacity-70"
              }`}
              onClick={() => setSelectedPlanetId(id)}
            >
              {name}
            </button>
          ))}
        </div>

        {/* toggles */}
        {Object.keys(toggleTextures).length > 0 && (
          <div className="flex bg-black w-min border-1 border-white/30 py-2 px-4 rounded-lg opacity-75">
            <ul>
              {Object.keys(toggleTextures).map((property) => (
                <li
                  className={`flex gap-3 opacity-30 hover:opacity-70 cursor-pointer transition-all duration-300 ease-out ${
                    selectedProperties.has(property) &&
                    "opacity-100 hover:opacity-100"
                  }`}
                  key={property}
                  onClick={() =>
                    setSelectedProperties((selectedProperties) => {
                      if (selectedProperties.has(property)) {
                        return new Set(
                          [...selectedProperties].filter((p) => p !== property)
                        );
                      }
                      return new Set([...selectedProperties, property]);
                    })
                  }
                >
                  <div className="flex items-center gap-3 cursor-pointer">
                    <div
                      className={`w-4 h-4 border flex items-center justify-center rounded-sm ${
                        selectedProperties.has(property) ? "bg-white" : ""
                      }`}
                    />
                    <span>{property}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* canvas (full screen) */}
      <Canvas
        className="w-full h-full"
        gl={{ alpha: true }}
        // camera={{ position: [0, 2.1, 0.75] }}
      >
        {/* <FlyByCamera /> */}
        <ambientLight intensity={selectedPlanetId === "earth" ? 0.2 : 0.1} />
        {selectedPlanetId !== "sun" && <SunLight />}
        <Planet
          axialTilt={selectedPlanet.tilt}
          retrograde={selectedPlanet.retrograde}
          textures={selectedPlanet.textures}
          textureOverrides={selectedProperties}
          scale={isMobile ? 0.75 : 1}
          speedMultiplier={selectedPlanetId === "sun" ? 0.2 : 1}
          emissive={selectedPlanetId === "sun"}
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
            intensity={1}
            luminanceThreshold={0.15}
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
