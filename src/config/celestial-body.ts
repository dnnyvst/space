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
    axialTilt: 0.034,
    textures: {
      map: `/textures/mercury/${RESOLUTION}_surface.jpg`,
    },
  },
  venus: {
    id: "venus",
    name: "venus",
    retrograde: true,
    axialTilt: 177.4,
    textures: {
      map: `/textures/venus/${RESOLUTION}_surface.jpg`,
      atmosphere: `/textures/venus/${RESOLUTION}_atmosphere.jpg`,
    },
  },
  earth: {
    id: "earth",
    name: "earth",
    axialTilt: 23.44,
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
    axialTilt: 25.19,
    textures: {
      map: `/textures/mars/${RESOLUTION}_surface.jpg`,
    },
  },
  jupiter: {
    id: "jupiter",
    name: "jupiter",
    axialTilt: 3.13,
    textures: {
      map: `/textures/jupiter/${RESOLUTION}_surface.jpg`,
    },
  },
  saturn: {
    id: "saturn",
    name: "saturn",
    axialTilt: 26.73,
    textures: {
      map: `/textures/saturn/${RESOLUTION}_surface.jpg`,
      ring: `/textures/saturn/${RESOLUTION}_ring.png`,
    },
  },
  uranus: {
    id: "uranus",
    name: "uranus",
    retrograde: true,
    axialTilt: 97.77,
    textures: {
      map: "/textures/uranus/surface.jpg",
    },
  },
  neptune: {
    id: "neptune",
    name: "neptune",
    axialTilt: 28.32,
    textures: {
      map: "/textures/neptune/surface.jpg",
    },
  },
};

const JUPITER_SCALE = 3.0;

export const MOON_CONFIG: MoonConfigMap = {
  moon: {
    id: "moon",
    name: "moon",
    parent: "earth",
    relativeScale: 0.273,
    relativeSpeed: 0.0366,
    orbitRadius: 4,
    orbitPhase: Math.random() * Math.PI * 2,
    axialTilt: 1.54,
    textures: {
      map: `/textures/moon/${RESOLUTION}_surface.jpg`,
    },
  },
  io: {
    id: "io",
    name: "io",
    parent: "jupiter",
    relativeScale: 0.026 * JUPITER_SCALE,
    relativeSpeed: 0.5,
    orbitRadius: 3.25,
    orbitPhase: Math.random() * Math.PI * 2,
    axialTilt: 0.05,
    textures: {
      map: "/textures/io/surface.jpg",
    },
  },
  europa: {
    id: "europa",
    name: "europa",
    parent: "jupiter",
    relativeScale: 0.022 * JUPITER_SCALE,
    relativeSpeed: 0.5,
    orbitRadius: 3.75,
    orbitPhase: Math.random() * Math.PI * 2,
    axialTilt: 0.1,
    textures: {
      map: "/textures/europa/surface.jpg",
    },
  },
  ganymede: {
    id: "ganymede",
    name: "ganymede",
    parent: "jupiter",
    relativeScale: 0.038 * JUPITER_SCALE,
    relativeSpeed: 0.5,
    orbitRadius: 4.25,
    orbitPhase: Math.random() * Math.PI * 2,
    axialTilt: 0.33,
    textures: {
      map: "/textures/ganymede/surface.jpg",
    },
  },
  callisto: {
    id: "callisto",
    name: "callisto",
    parent: "jupiter",
    relativeScale: 0.034 * JUPITER_SCALE,
    relativeSpeed: 0.5,
    orbitRadius: 4.75,
    orbitPhase: Math.random() * Math.PI * 2,
    axialTilt: 0.51,
    textures: {
      map: "/textures/callisto/surface.jpg",
    },
  },
};

export const CELESTIAL_BODY_CONFIG: CelestialBodyConfigMap = {
  sun: {
    id: "sun",
    name: "sun",
    axialTilt: 7.25,
    textures: { map: `/textures/sun/${RESOLUTION}_surface.jpg` },
  },
  moon: MOON_CONFIG["moon"],
  ...PLANET_CONFIG,
};
