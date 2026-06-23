import { useCameraContext } from "@/hooks";

export const CameraZoomSlider = () => {
  const { handheldZoom, setHandheldZoom } = useCameraContext();

  const min = 1;
  const max = 22;

  const percent = ((handheldZoom - min) / (max - min)) * 100;

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={handheldZoom}
        onChange={(e) => setHandheldZoom(+e.target.value)}
        className="custom-slider"
        style={{ ["--fill" as never]: `${percent}%` }}
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

          --fill: 0%;
        }

        /* TRACK (with fill effect) */
        .custom-slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 3px;
          border: 1px solid #cfc8bb;
          box-sizing: border-box;

          background: linear-gradient(
            to right,
            #cfc8bb 0%,
            #cfc8bb var(--fill),
            transparent var(--fill),
            transparent 100%
          );
        }

        .custom-slider::-moz-range-track {
          height: 8px;
          border-radius: 3px;
          border: 1px solid #cfc8bb;
          box-sizing: border-box;

          background: linear-gradient(
            to right,
            #cfc8bb 0%,
            #cfc8bb var(--fill),
            transparent var(--fill),
            transparent 100%
          );
        }

        /* Thumb */
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;

          width: 12px;
          height: 22px;

          background: #cfc8bb;
          border: 1px solid black;
          border-radius: 3px;

          cursor: pointer;
          margin-top: -8px;
        }

        .custom-slider::-moz-range-thumb {
          width: 12px;
          height: 22px;

          background: #cfc8bb;
          border: 1px solid #black;
          border-radius: 3px;

          cursor: pointer;
        }
      `}</style>
    </>
  );
};
