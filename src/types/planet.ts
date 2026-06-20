export type Planet =
  | "mercury"
  | "venus"
  | "earth"
  | "mars"
  | "neptune"
  | "moon";

export interface PlanetTextures {
  map: string;
  normal?: string;
  clouds?: string;
  atmosphere?: string;
}
