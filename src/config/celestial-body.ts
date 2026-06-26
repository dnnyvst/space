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
    radius: 2439.7,
    axialTilt: 0.034,

    rotationalSpeed: 10.9,

    textures: {
      map: `/textures/mercury/${RESOLUTION}_surface.jpg`,
    },
  },

  venus: {
    id: "venus",
    name: "venus",
    radius: 6051.8,
    axialTilt: 177.4,

    retrograde: true,
    rotationalSpeed: 6.5,

    textures: {
      map: `/textures/venus/${RESOLUTION}_surface.jpg`,
      atmosphere: `/textures/venus/${RESOLUTION}_atmosphere.jpg`,
    },
  },

  earth: {
    id: "earth",
    name: "earth",
    radius: 6371,
    axialTilt: 23.44,

    rotationalSpeed: 1670,

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
    radius: 3389.5,
    axialTilt: 25.19,

    rotationalSpeed: 866,

    textures: {
      map: `/textures/mars/${RESOLUTION}_surface.jpg`,
    },
  },

  jupiter: {
    id: "jupiter",
    name: "jupiter",
    radius: 69886,
    axialTilt: 3.13,

    rotationalSpeed: 45300,

    textures: {
      map: `/textures/jupiter/${RESOLUTION}_surface.jpg`,
    },
  },

  saturn: {
    id: "saturn",
    name: "saturn",
    radius: 58232,
    axialTilt: 26.73,

    rotationalSpeed: 35500,

    textures: {
      map: `/textures/saturn/${RESOLUTION}_surface.jpg`,
      ring: `/textures/saturn/${RESOLUTION}_ring.png`,
    },
  },

  uranus: {
    id: "uranus",
    name: "uranus",
    radius: 25362,
    retrograde: true,
    axialTilt: 97.77,

    rotationalSpeed: 9300,

    textures: {
      map: "/textures/uranus/surface.jpg",
    },
  },

  neptune: {
    id: "neptune",
    name: "neptune",
    radius: 24622,
    axialTilt: 28.32,

    rotationalSpeed: 9650,

    textures: {
      map: "/textures/neptune/surface.jpg",
    },
  },
};

const JUPITER_SCALE = 3.0;

// todo - all relative to solar ecliptic plane
// orbitalTilt = inclination relative to parent planet equator
export const MOON_CONFIG: MoonConfigMap = {
  moon: {
    id: "moon",
    name: "moon",
    parent: "earth",
    radius: 1737.4,
    axialTilt: 1.54,
    rotationalSpeed: 16.6,

    orbitRadius: 4,
    orbitalTilt: 5.145 - PLANET_CONFIG.earth.axialTilt,
    orbitalSpeed: 0.1,
    orbitPhase: Math.random() * Math.PI * 2,

    textures: {
      map: `/textures/moon/${RESOLUTION}_surface.jpg`,
    },
  },

  io: {
    id: "io",
    name: "io",
    parent: "jupiter",
    radius: 1821.6 * JUPITER_SCALE,
    axialTilt: 0.05,
    rotationalSpeed: 269,

    orbitRadius: 3.25,
    orbitalTilt: 0.04,
    orbitalSpeed: 1.54,
    orbitPhase: Math.random() * Math.PI * 2,

    textures: {
      map: "/textures/io/surface.jpg",
    },
  },

  europa: {
    id: "europa",
    name: "europa",
    parent: "jupiter",
    radius: 1560.8 * JUPITER_SCALE,
    axialTilt: 0.1,
    rotationalSpeed: 115,

    orbitRadius: 3.75,
    orbitalTilt: 0.47,
    orbitalSpeed: 0.77,
    orbitPhase: Math.random() * Math.PI * 2,

    textures: {
      map: "/textures/europa/surface.jpg",
    },
  },

  ganymede: {
    id: "ganymede",
    name: "ganymede",
    parent: "jupiter",
    radius: 2634.1 * JUPITER_SCALE,
    axialTilt: 0.33,
    rotationalSpeed: 96.5,

    orbitRadius: 4.25,
    orbitalTilt: 0.19,
    orbitalSpeed: 0.38,
    orbitPhase: Math.random() * Math.PI * 2,

    textures: {
      map: "/textures/ganymede/surface.jpg",
    },
  },

  callisto: {
    id: "callisto",
    name: "callisto",
    parent: "jupiter",
    radius: 2410.3 * JUPITER_SCALE,
    axialTilt: 0.51,
    rotationalSpeed: 37.8,

    orbitRadius: 4.75,
    orbitalTilt: 0.28,
    orbitalSpeed: 0.16,
    orbitPhase: Math.random() * Math.PI * 2,

    textures: {
      map: "/textures/callisto/surface.jpg",
    },
  },

  triton: {
    id: "triton",
    name: "triton",
    parent: "neptune",
    radius: 1353.4 * JUPITER_SCALE,
    axialTilt: 0,
    rotationalSpeed: 60.3,

    orbitRadius: 4.2,
    orbitalTilt: 23,
    orbitalSpeed: 0.06,
    orbitPhase: Math.random() * Math.PI * 2,
    retrograde: true,

    textures: {
      map: "/textures/triton/surface.jpg",
    },
  },
};

export const CELESTIAL_BODY_CONFIG: CelestialBodyConfigMap = {
  sun: {
    id: "sun",
    name: "sun",
    axialTilt: 7.25,
    rotationalSpeed: 0.02,
    textures: { map: `/textures/sun/${RESOLUTION}_surface.jpg` },
  } as PlanetConfig,
  moon: MOON_CONFIG["moon"],
  ...PLANET_CONFIG,
};
