import { type FC } from "react";
import { useCameraContext } from "@/hooks";
import { Slider } from "@/components";

interface CameraZoomSliderProps {
  disabled?: boolean;
}

export const CameraZoomSlider: FC<CameraZoomSliderProps> = ({
  disabled = false,
}) => {
  const { handheldZoom, setHandheldZoom } = useCameraContext();

  return (
    <Slider
      min={0}
      max={22}
      value={handheldZoom}
      setValue={setHandheldZoom}
      disabled={disabled}
    />
  );
};
