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
  mercury: {
    id: "mercury",
    name: "mercury",
    tilt: 0.034,
    textures: {
      map: "/textures/mercury/surface.jpg",
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
  earth: {
    id: "earth",
    name: "earth",
    tilt: 23.44,
    textures: {
      map: "/textures/earth/day.jpg",
      normal: "/textures/earth/normal.jpg",
      clouds: "/textures/earth/clouds.jpg",
      night: "/textures/earth/night.jpg",
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
  mars: {
    id: "mars",
    name: "mars",
    tilt: 25.19,
    textures: {
      map: "/textures/mars/surface.jpg",
    },
  },
  jupiter: {
    id: "jupiter",
    name: "jupiter",
    tilt: 3.13,
    textures: {
      map: "/textures/jupiter/surface.jpg",
    },
  },
  saturn: {
    id: "saturn",
    name: "saturn",
    tilt: 26.73,
    textures: {
      map: "/textures/saturn/surface.jpg",
      ring: "/textures/saturn/ring.png",
    },
  },
  uranus: {
    id: "uranus",
    name: "uranus",
    retrograde: true,
    tilt: 97.77,
    textures: {
      map: "/textures/uranus/surface.jpg",
    },
  },
  neptune: {
    id: "neptune",
    name: "neptune",
    tilt: 28.32,
    textures: {
      map: "/textures/neptune/surface.jpg",
    },
  },
};
