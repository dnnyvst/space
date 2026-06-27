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
  orbitalRadius: number;
  orbitPhase: number;
  orbitalSpeed: number;
  // relative to the ecliptic
  orbitalTilt: number;
}
