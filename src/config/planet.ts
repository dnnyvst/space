import type { Planet, PlanetTextures } from "@/types";

interface PlanetConfig {
  id: string;
  name: Planet;
  retrograde?: boolean;
  tilt: number;
  textures: PlanetTextures;
}

interface PlanetConfigMap {
  [id: string]: PlanetConfig;
}

export const PLANET_CONFIG: PlanetConfigMap = {
  earth: {
    id: "earth",
    name: "earth",
    tilt: 23.44,
    textures: {
      map: "/textures/earth/day.jpg",
      normal: "/textures/earth/normal.jpg",
      clouds: "/textures/earth/clouds.jpg",
    },
  },
  moon: {
    id: "moon",
    name: "moon",
    tilt: 1.54,
    textures: {
      map: "/textures/moon/moon.jpg",
    },
  },
  venus: {
    id: "venus",
    name: "venus",
    retrograde: true,
    tilt: 177.4,
    textures: {
      map: "/textures/venus/surface.jpg",
      atmosphere: "/textures/venus/atmosphere.jpg",
    },
  },
  neptune: {
    id: "neptune",
    name: "neptune",
    tilt: 177.4,
    textures: {
      map: "/textures/venus/surface.jpg",
      atmosphere: "/textures/venus/atmosphere.jpg",
    },
  },
};
