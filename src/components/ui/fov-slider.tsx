import { useCameraContext } from "@/hooks";
import { Slider } from "@/components";
import { MIN_FOV, MAX_FOV } from "@/cameras";

export const FOVSlider = () => {
  const { fov, setFov } = useCameraContext();

  return <Slider min={MIN_FOV} max={MAX_FOV} value={fov} setValue={setFov} />;
};
