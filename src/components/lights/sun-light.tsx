import { type FC } from "react";

interface SunLightProps {
  noColor?: boolean;
}

export const SunLight: FC<SunLightProps> = ({ noColor = false }) => (
  <directionalLight
    position={[5, 5, 5]}
    intensity={2}
    castShadow
    color={noColor ? "white" : "#fff1d6"}
  />
);
