export type Planet =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "moon";

export interface PlanetTextures {
  map: string;
  normal?: string;
  clouds?: string;
  atmosphere?: string;
}
