"use client";

import { useState, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Planet, SunLight } from "@/components";
import { PLANET_CONFIG } from "@/config";

export const MainCanvas: FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");

  const selectedPlanet = PLANET_CONFIG[selectedPlanetId];

  return (
    <div className="h-screen relative font-mono">
      {/* UI OVERLAY*/}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-10">
        {/* Planet select */}
        <div className="flex gap-6 bg-black w-min border-1 border-white/30 py-2 px-4 rounded-lg">
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

        {/* Toggles (placeholder) */}
        <div className="flex bg-black w-min border-1 border-white/30 py-2 px-4 rounded-lg">
          test
        </div>
      </div>

      {/* CANVAS (full screen, never moves) */}
      <Canvas className="w-full h-full">
        <ambientLight intensity={selectedPlanetId === "earth" ? 0.2 : 0.1} />
        <SunLight />
        <Planet
          axialTilt={selectedPlanet.tilt}
          retrograde={selectedPlanet.retrograde}
          textures={selectedPlanet.textures}
        />
      </Canvas>

      {/* Saturn overlay */}
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
