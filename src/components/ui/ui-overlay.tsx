import { type FC } from "react";
import { CameraZoomSlider, FOVSlider } from "@/components";
import { CELESTIAL_BODY_CONFIG, MOON_CONFIG } from "@/config";
import { useAppContext, useCameraContext, useIsMobile } from "@/hooks";

interface ListItemProps {
  selected: boolean;
  onClick: () => void;
  text: string;
}

const ListItem: FC<ListItemProps> = ({ selected, onClick, text }) => (
  <li
    className={`flex gap-3 items-center cursor-pointer opacity-30 hover:opacity-70 transition-all duration-300 ease-out ${
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
    showOrbitPaths,
    setShowOrbitPaths,
  } = useAppContext();
  const { activeCamera, fov, setActiveCamera } = useCameraContext();

  const isMobile = useIsMobile(640);

  const selectedCelestialBody = CELESTIAL_BODY_CONFIG[selectedCelestialBodyId];
  const hasMoons = Object.values(MOON_CONFIG).some(
    (moon) => moon.parent === selectedCelestialBodyId,
  );

  const toggleTextures = Object.fromEntries(
    Object.entries(selectedCelestialBody.textures).filter(
      ([key, value]) => !["map", "normal", "ring"].includes(key) && value,
    ),
  );

  const handheldZoomDisabled =
    activeCamera === "orbit" || activeCamera === "follow";

  return (
    <div className="pointer-events-none flex justify-center h-screen absolute py-4 px-4 z-10 w-full">
      <div
        className={`${isMobile ? "justify-between pb-10" : "lg:justify-center justify-end"} items-center flex flex-col-reverse gap-4 lg:items-start lg:flex-row`}
      >
        {/* controls */}
        <div className="pointer-events-auto flex gap-2 w-full lg:flex-col lg:w-auto lg:min-w-1/5">
          {/* sliders */}
          <div className="flex flex-col gap-2 bg-card/0 whitespace-nowrap border border-text/30 py-2 px-4 rounded-lg">
            <span className="flex flex-col">
              <span className="text-center">fov: {fov}&deg;</span>
              <FOVSlider />
            </span>
            <span className="flex flex-col">
              <span
                className={`text-center ${handheldZoomDisabled && "opacity-20"}`}
              >
                zoom
              </span>
              <CameraZoomSlider disabled={handheldZoomDisabled} />
            </span>
            <ul className="pt-2">
              <ListItem
                selected={activeCamera === "orbit"}
                onClick={() =>
                  setActiveCamera((activeCamera) =>
                    activeCamera === "orbit" ? "handheld" : "orbit",
                  )
                }
                text="orbit cam"
              />
            </ul>
          </div>
          {/* toggles */}
          {(hasMoons || Object.keys(toggleTextures).length > 0) && (
            <div className="bg-card/0 whitespace-nowrap border border-text/30 py-2 px-4 rounded-lg h-min">
              <ul>
                {hasMoons && (
                  <ListItem
                    selected={showOrbitPaths}
                    onClick={() =>
                      setShowOrbitPaths((showOrbitPaths) => !showOrbitPaths)
                    }
                    text="orbit paths"
                  />
                )}
                {Object.keys(toggleTextures).map((property) => (
                  <ListItem
                    key={property}
                    selected={selectedProperties.has(property)}
                    onClick={() =>
                      setSelectedProperties((prev) => {
                        if (prev.has(property)) {
                          return new Set(
                            [...prev].filter((p) => p !== property),
                          );
                        }
                        return new Set([...prev, property]);
                      })
                    }
                    text={property}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* celestial body select */}
        <div
          className={`pointer-events-auto flex flex-wrap gap-3 bg-card/0 border border-text/30 py-2 px-4 rounded-lg h-min lg:w-min lg:flex-nowrap lg:gap-6 ${activeCamera === "orbit" && "invisible opacity-0"}`}
        >
          {Object.values(CELESTIAL_BODY_CONFIG).map(({ id, name }) => (
            <button
              key={id}
              className={`cursor-pointer transition-all duration-300 ease-out ${
                id === selectedCelestialBody.id
                  ? "underline underline-offset-4 decoration-2 opacity-100"
                  : "opacity-30 hover:opacity-70"
              }`}
              onClick={() => {
                setSelectedCelestialBodyId(id);
                if (activeCamera === "follow") {
                  setActiveCamera("handheld");
                }
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
