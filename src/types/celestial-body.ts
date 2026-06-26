import type { Planet, Moon } from "@/types";
export interface CelestialBodyTextures {
  map: string;
  normal?: string;
  clouds?: string;
  atmosphere?: string;
  ring?: string;
  night?: string;
}

export interface CelestialBody {
  id: string;
  name: Planet | Moon;
  // km
  radius: number;
  // km/h
  rotationalSpeed: number;
  retrograde?: boolean;
  axialTilt: number;
  textures: CelestialBodyTextures;
}
