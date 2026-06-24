import { type FC } from "react";
import { CameraZoomSlider, FOVSlider } from "@/components";
import { CELESTIAL_BODY_CONFIG } from "@/config";
import { useAppContext, useCameraContext, useIsMobile } from "@/hooks";

interface ListItemProps {
  selected: boolean;
  onClick: () => void;
  text: string;
}

const ListItem: FC<ListItemProps> = ({ selected, onClick, text }) => (
  <li
    className={`flex gap-3 items-center cursor-pointer opacity-30 hover:opacity-70 cursor-pointer transition-all duration-300 ease-out ${
      selected && "opacity-100 hover:opacity-100"
    }`}
    onClick={onClick}
  >
    <div
      className={`w-4 h-4 border flex items-center justify-center rounded-sm ${
        selected && "bg-text"
      }`}
    />
    <span>{text}</span>
  </li>
);

export const UIOverlay: FC = () => {
  const {
    selectedCelestialBodyId,
    setSelectedCelestialBodyId,
    selectedProperties,
    setSelectedProperties,
  } = useAppContext();
  const { orbitMode, fov, setOrbitMode } = useCameraContext();

  const isMobile = useIsMobile(640);

  const selectedCelestialBody = CELESTIAL_BODY_CONFIG[selectedCelestialBodyId];

  const toggleTextures = Object.fromEntries(
    Object.entries(selectedCelestialBody.textures).filter(
      ([key, value]) => !["map", "normal", "ring"].includes(key) && value,
    ),
  );

  return (
    <div
      className={`flex gap-4 justify-center h-screen absolute p-4 z-10 w-full ${isMobile && "justify-between pb-14"}`}
    >
      {/* controls */}
      <div
        className={`flex flex-col ${!isMobile && "gap-2"} ${isMobile && "flex-row justify-between"}`}
      >
        {/* sliders */}
        <div className="flex flex-col gap-2 bg-card/0 whitespace-nowrap border border-text/30 py-2 px-4 rounded-lg z-10 h-min">
          <span className="flex flex-col">
            <span className="text-center">fov: {fov}&deg;</span>
            <FOVSlider />
          </span>
          <span className="flex flex-col">
            <span className={`text-center ${orbitMode && "opacity-20"}`}>
              zoom
            </span>
            <CameraZoomSlider disabled={orbitMode} />
          </span>
        </div>
        {/* toggles */}
        <div className="bg-card/0 whitespace-nowrap border border-text/30 py-2 px-4 rounded-lg z-10 h-min">
          <ul>
            <ListItem
              selected={orbitMode === true}
              onClick={() => setOrbitMode((orbitMode) => !orbitMode)}
              text={`orbit ${!isMobile ? "cam" : ""}`}
            />
            {Object.keys(toggleTextures).map((property) => (
              <ListItem
                key={property}
                selected={selectedProperties.has(property)}
                onClick={() =>
                  setSelectedProperties((prev) => {
                    if (prev.has(property)) {
                      return new Set([...prev].filter((p) => p !== property));
                    }
                    return new Set([...prev, property]);
                  })
                }
                text={property}
              />
            ))}
          </ul>
        </div>
      </div>
      {/* celestial body select */}
      <div
        className={`flex flex-wrap md:flex-nowrap gap-3 md:gap-6 bg-card/0 border border-text/30 py-2 px-4 rounded-lg w-min h-min ${orbitMode && "invisible opacity-0"} `}
      >
        {Object.values(CELESTIAL_BODY_CONFIG).map(({ id, name }) => (
          <button
            key={id}
            className={`cursor-pointer transition-all duration-300 ease-out ${
              id === selectedCelestialBody.id
                ? "underline underline-offset-4 decoration-2 opacity-100"
                : "opacity-30 hover:opacity-70"
            }`}
            onClick={() => setSelectedCelestialBodyId(id)}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};
