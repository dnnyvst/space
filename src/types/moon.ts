import type { CelestialBody, Planet } from "@/types";

export type Moon = "moon" | "io" | "europa" | "ganymede" | "callisto";

export interface MoonConfig extends CelestialBody {
  name: Moon;
  parent: Planet;
  relativeScale: number;
  relativeRotationalSpeed: number;
  orbitRadius: number;
  orbitPhase: number;
  orbitalSpeed: number;
  orbitalTilt: number;
}
