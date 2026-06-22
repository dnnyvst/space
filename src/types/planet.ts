import type { CelestialBody } from "@/types";

export type Planet =
  | "sun"
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "moon";

export interface PlanetConfig extends CelestialBody {
  name: Planet;
}
