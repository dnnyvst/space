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
    // position={[5, 5, 5]}
    // intensity={2}
    // castShadow
    // shadow-mapSize={[2048, 2048]}
    // shadow-camera-near={0.5}
    // shadow-camera-far={50}
    // shadow-camera-left={-15}
    // shadow-camera-right={15}
    // shadow-camera-top={15}
    // shadow-camera-bottom={-15}
  />
);
