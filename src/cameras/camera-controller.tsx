import { PerspectiveCamera } from "@react-three/drei";
import { HandheldCamera, OrbitCamera } from "@/cameras";
import { useAppContext } from "@/hooks";

export const MIN_FOV = 75;
export const MAX_FOV = 90;

export const CameraController = () => {
  const { orbitMode, fov } = useAppContext();

  return (
    <>
      <PerspectiveCamera makeDefault near={0.1} far={5000} fov={fov} />
      <HandheldCamera enabled={!orbitMode} />
      <OrbitCamera enabled={orbitMode} />
    </>
  );
};
