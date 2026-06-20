"use client";

import { useState, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Planet, SunLight } from "@/components";
import { PLANET_CONFIG } from "@/config";

export const MainCanvas: FC = () => {
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");

  const selectedPlanet = PLANET_CONFIG[selectedPlanetId];

  return (
    <div className=" h-screen flex flex-col">
      <div className="flex gap-8 pt-10 justify-center font-mono">
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
      <Canvas className="w-full h-full flex-1">
        {/* temporary, was 0.4 */}
        <ambientLight intensity={selectedPlanetId === "earth" ? 0.1 : 0.1} />
        <SunLight />
        {selectedPlanet && (
          <Planet
            axialTilt={selectedPlanet.tilt}
            retrograde={selectedPlanet.retrograde}
            textures={selectedPlanet.textures}
          />
        )}
      </Canvas>
    </div>
  );
};
