import { type FC } from "react";
interface SliderProps {
  min: number;
  max: number;
  value: number;
  setValue: (value: number) => void;
  disabled?: boolean;
}
export const Slider: FC<SliderProps> = ({
  min,
  max,
  value,
  setValue,
  disabled = false,
}) => {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(+e.target.value)}
        disabled={disabled}
        className={`custom-slider ${disabled && "opacity-20 pointer-events-none"}`}
        style={{ ["--fill" as never]: `${percent}%` }}
      />

      <style jsx>{`
        .custom-slider {
          appearance: none;
          -webkit-appearance: none;

          width: auto;
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
