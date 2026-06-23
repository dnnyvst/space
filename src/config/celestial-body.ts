import type { PlanetConfig, MoonConfig, CelestialBody } from "@/types";

interface PlanetConfigMap {
  [id: string]: PlanetConfig;
}

interface MoonConfigMap {
  [id: string]: MoonConfig;
}

interface CelestialBodyConfigMap {
  [id: string]: CelestialBody;
}

const RESOLUTION = "8k";

export const PLANET_CONFIG: PlanetConfigMap = {
  mercury: {
    id: "mercury",
    name: "mercury",
    tilt: 0.034,
    textures: {
      map: `/textures/mercury/${RESOLUTION}_surface.jpg`,
    },
  },
  venus: {
    id: "venus",
    name: "venus",
    retrograde: true,
    tilt: 177.4,
    textures: {
      map: `/textures/venus/${RESOLUTION}_surface.jpg`,
      atmosphere: `/textures/venus/${RESOLUTION}_atmosphere.jpg`,
    },
  },
  earth: {
    id: "earth",
    name: "earth",
    tilt: 23.44,
    textures: {
      map: `/textures/earth/${RESOLUTION}_day.jpg`,
      normal: `/textures/earth/${RESOLUTION}_normal.jpg`,
      clouds: `/textures/earth/${RESOLUTION}_clouds.jpg`,
      night: `/textures/earth/${RESOLUTION}_night.jpg`,
    },
  },
  mars: {
    id: "mars",
    name: "mars",
    tilt: 25.19,
    textures: {
      map: `/textures/mars/${RESOLUTION}_surface.jpg`,
    },
  },
  jupiter: {
    id: "jupiter",
    name: "jupiter",
    tilt: 3.13,
    textures: {
      map: `/textures/jupiter/${RESOLUTION}_surface.jpg`,
    },
  },
  saturn: {
    id: "saturn",
    name: "saturn",
    tilt: 26.73,
    textures: {
      map: `/textures/saturn/${RESOLUTION}_surface.jpg`,
      ring: `/textures/saturn/${RESOLUTION}_ring.png`,
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

export const MOON_CONFIG: MoonConfigMap = {
  moon: {
    id: "moon",
    name: "moon",
    parent: "earth",
    relativeScale: 0.27,
    relativeSpeed: 0.0366,
    tilt: 1.54,
    textures: {
      map: `/textures/moon/${RESOLUTION}_surface.jpg`,
    },
    initialPosition: [4, 2, -1],
    // initialPosition: [2, 1, 2],
  },
  // "moon-2": {
  //   id: "moon-2",
  //   name: "moon-2",
  //   parent: "earth",
  //   scale: 0.27,
  //   tilt: 1.54,
  //   textures: {
  //     map: `/textures/moon/${RESOLUTION}_surface.jpg`,
  //   },
  //   initialPosition: [-3, 1, -1],
  // },
};

export const CELESTIAL_BODY_CONFIG: CelestialBodyConfigMap = {
  sun: {
    id: "sun",
    name: "sun",
    tilt: 7.25,
    textures: { map: `/textures/sun/${RESOLUTION}_surface.jpg` },
  },
  ...MOON_CONFIG,
  ...PLANET_CONFIG,
};
