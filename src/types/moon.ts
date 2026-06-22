import * as THREE from "three";
import type { CelestialBody, Planet } from "@/types";

export type Moon = "moon";

export interface MoonConfig extends CelestialBody {
  name: Moon;
  parent: Planet;
  scale: number;
  initialPosition: THREE.Vector3Tuple;
}
