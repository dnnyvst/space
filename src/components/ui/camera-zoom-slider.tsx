import { useAppContext } from "@/hooks";

export const CameraZoomSlider = () => {
  const { cameraZoom, setCameraZoom } = useAppContext();

  return (
    <>
      <input
        type="range"
        min={1}
        max={22}
        value={cameraZoom}
        onChange={(e) => setCameraZoom(+e.target.value)}
        className="custom-slider"
      />

      <style jsx>{`
        .custom-slider {
          appearance: none;
          -webkit-appearance: none;

          width: 160px;
          height: 20px;

          background: transparent;
          margin: 0;
          padding: 0;
        }

        /* Track */
        .custom-slider::-webkit-slider-runnable-track {
          height: 8px;
          background: #cfc8bb;
          border-radius: 3px;
          border: 1px solid black;
          box-sizing: border-box;
        }

        .custom-slider::-moz-range-track {
          height: 8px;
          background: #cfc8bb;
          border-radius: 3px;
          border: 1px solid black;
          box-sizing: border-box;
        }

        /* Thumb */
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;

          width: 12px;
          height: 22px;

          background: #cfc8bb;
          border-radius: 3px;

          border: 1px solid black;

          cursor: pointer;

          margin-top: -7px;
        }

        .custom-slider::-moz-range-thumb {
          width: 12px;
          height: 22px;

          background: #cfc8bb;
          border-radius: 3px;

          border: 1px solid black;

          cursor: pointer;
        }
      `}</style>
    </>
  );
};
