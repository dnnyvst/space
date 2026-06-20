import { Planet } from "@/components";

const AXIAL_TILT = 1.54;

export const Moon = () => (
  <Planet
    axialTilt={AXIAL_TILT}
    textures={{
      map: "/textures/moon/moon.jpg",
    }}
  />
);
