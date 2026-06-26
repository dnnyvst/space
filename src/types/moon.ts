import type { CelestialBody, Planet } from "@/types";

export type Moon =
  | "moon"
  | "io"
  | "europa"
  | "ganymede"
  | "callisto"
  | "triton";

export interface MoonConfig extends CelestialBody {
  name: Moon;
  parent: Planet;
  relativeRotationalSpeed: number;
  orbitRadius: number;
  orbitPhase: number;
  orbitalSpeed: number;
  orbitalTilt: number;
}
