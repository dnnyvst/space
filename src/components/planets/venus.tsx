import { Planet } from "@/components";

const AXIAL_TILT = 177.4;

export const Venus = () => (
  <Planet
    axialTilt={AXIAL_TILT}
    retrograde
    textures={{
      map: "/textures/venus/surface.jpg",
      atmosphere: "/textures/venus/atmosphere.jpg",
    }}
  />
);
