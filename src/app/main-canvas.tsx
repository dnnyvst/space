"use client";

import { useState, type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth, Moon, Venus, SunLight } from "@/components";

type Planet = "earth" | "moon" | "venus";

const planets: Planet[] = ["earth", "moon", "venus"];

export const MainCanvas: FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>("earth");

  return (
    <div className=" h-screen flex flex-col">
      <div className="flex gap-8 pt-10 justify-center font-mono">
        {planets.map((planet) => (
          <button
            key={planet}
            className={`cursor-pointer transition-all duration-300 ease-out ${
              planet === selectedPlanet
                ? "underline underline-offset-4 decoration-2 opacity-100"
                : "opacity-30 hover:opacity-70"
            }`}
            onClick={() => setSelectedPlanet(planet)}
          >
            {planet}
          </button>
        ))}
      </div>
      <Canvas className="w-full h-full flex-1">
        <ambientLight intensity={0.1} />
        <SunLight noColor={selectedPlanet === "moon"} />
        {(() => {
          switch (selectedPlanet) {
            case "earth":
              return <Earth />;
            case "moon":
              return <Moon />;
            case "venus":
              return <Venus />;
            default:
              return <Earth />;
          }
        })()}
      </Canvas>
    </div>
  );
};
