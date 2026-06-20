import { Planet } from "@/components";

const AXIAL_TILT = 23.44;

export const Earth = () => (
  <Planet
    axialTilt={AXIAL_TILT}
    textures={{
      map: "/textures/earth/day.jpg",
      normal: "/textures/earth/normal.jpg",
      clouds: "/textures/earth/clouds.jpg",
    }}
  />
);
