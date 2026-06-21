import { type FC } from "react";

interface SunLightProps {
  noColor?: boolean;
}

/*
  some color ideas

  #fff1d6
*/

export const SunLight: FC<SunLightProps> = ({ noColor = true }) => (
  <directionalLight
    position={[5, 5, 5]}
    intensity={2}
    castShadow
    color={noColor ? "white" : "#fff1d6"}
  />
);
