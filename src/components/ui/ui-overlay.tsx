import { type FC } from "react";
import { CameraZoomSlider } from "@/components";
import { CELESTIAL_BODY_CONFIG } from "@/config";
import { useAppContext, useIsMobile } from "@/hooks";

interface ListItemProps {
  selected: boolean;
  onClick: () => void;
  text: string;
}

const ListItem: FC<ListItemProps> = ({ selected, onClick, text }) => (
  <li
    className={`flex gap-3 opacity-30 hover:opacity-70 cursor-pointer transition-all duration-300 ease-out ${
      selected && "opacity-100 hover:opacity-100"
    }`}
    onClick={onClick}
  >
    <div className="flex items-center gap-3 cursor-pointer">
      <div
        className={`w-4 h-4 border flex items-center justify-center rounded-sm ${
          selected && "bg-text"
        }`}
      />
      <span>{text}</span>
    </div>
  </li>
);

export const UIOverlay: FC = () => {
  const {
    orbitMode,
    setOrbitMode,
    selectedCelestialBodyId,
    setSelectedCelestialBodyId,
    selectedProperties,
    setSelectedProperties,
  } = useAppContext();

  const isMobile = useIsMobile(640);

  const selectedCelestialBody = CELESTIAL_BODY_CONFIG[selectedCelestialBodyId];

  const toggleTextures = Object.fromEntries(
    Object.entries(selectedCelestialBody.textures).filter(
      ([key, value]) => !["map", "normal", "ring"].includes(key) && value,
    ),
  );

  return (
    <div
      className={`h-screen ${
        isMobile && "justify-between pb-12"
      } absolute py-6 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-10 w-3/4 md:w-min`}
    >
      {/* celestial body select */}
      <div
        className={`${
          orbitMode && "invisible opacity-0"
        } flex flex-wrap md:flex-nowrap gap-3 md:gap-6 bg-transparent border border-text/30 py-2 px-4 rounded-lg`}
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
      {/* toggles */}
      <div className="gap-4 flex flex-col bg-transparent whitespace-nowrap border border-text/30 py-2 px-4 rounded-lg z-10 w-min">
        <ul>
          {/* {isMobile && (
                <ListItem
                selected={isMobile && gyroEnabled}
                onClick={async () => {
                    if (gyroEnabled) {
                    setGyroEnabled(false);
                    return;
                    }
                    const ok = await requestGyroPermission();
                    setGyroEnabled(ok);
                }}
                text="enable tilt"
                />
            )} */}
          <ListItem
            selected={orbitMode === true}
            onClick={() => setOrbitMode((orbitMode) => !orbitMode)}
            text="orbit mode"
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
        {/* zoom slider */}
        <span className={`flex flex-col ${orbitMode && "invisible opacity-0"}`}>
          <span className="text-center">camera</span>
          <CameraZoomSlider />
        </span>
      </div>
    </div>
  );
};
