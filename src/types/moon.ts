import * as THREE from "three";
import type { CelestialBody, Planet } from "@/types";

export type Moon = "moon" | "io" | "europa" | "ganymede" | "callisto";

export interface MoonConfig extends CelestialBody {
  name: Moon;
  parent: Planet;
  relativeScale: number;
  relativeRotationalSpeed: number;
  orbitRadius: number;
  initialPosition?: THREE.Vector3Tuple;
  orbitPhase: number;
}
