import * as THREE from "three";
import type { CelestialBody, Planet } from "@/types";

export type Moon = "moon" | "moon-2";

export interface MoonConfig extends CelestialBody {
  name: Moon;
  parent: Planet;
  relativeScale: number;
  relativeSpeed: number;
  orbitRadius: number;
  initialPosition?: THREE.Vector3Tuple;
}
