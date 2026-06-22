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
  retrograde?: boolean;
  tilt: number;
  textures: CelestialBodyTextures;
}
