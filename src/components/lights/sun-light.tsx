import { type FC } from "react";

interface SunLightProps {
  natural?: boolean;
}

/*
  some color ideas

  #fff1d6
*/

export const SunLight: FC<SunLightProps> = ({ natural = false }) => (
  <directionalLight
    position={[5, 5, 5]}
    intensity={2}
    castShadow
    color={natural ? "#fff1d6" : "white"}
  />
);
