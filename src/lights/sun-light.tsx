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
    // position={[5, 5, 5]}
    position={[10, 8, 8]}
    // position={[5, 0, 0]}
    intensity={2}
    castShadow
    color={natural ? "#fff1d6" : "white"}
    // shadow-mapSize={[2048, 2048]}
    // shadow-camera-near={0.5}
    // shadow-camera-far={50}
    // shadow-camera-left={-30}
    // shadow-camera-right={30}
    // shadow-camera-top={30}
    // shadow-camera-bottom={-30}
  />
);
