import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { CELESTIAL_BODY_CONFIG } from "@/config";
import type { CelestialBody } from "@/types";
interface AppContextValue {
  canvasReady: boolean;
  orbitMode: boolean;
  selectedCelestialBody: CelestialBody;
  selectedProperties: Set<string>;

  setCanvasReady: Dispatch<SetStateAction<boolean>>;
  setOrbitMode: Dispatch<SetStateAction<boolean>>;
  setSelectedCelestialBody: (celestialBody: CelestialBody) => void;
  setSelectedProperties: Dispatch<SetStateAction<Set<string>>>;
}

const INIT: AppContextValue = {
  canvasReady: false,
  orbitMode: false,
  selectedCelestialBody: CELESTIAL_BODY_CONFIG["earth"],
  selectedProperties: new Set(["clouds", "atmosphere"]),

  setCanvasReady: () => {},
  setOrbitMode: () => {},
  setSelectedCelestialBody: () => {},
  setSelectedProperties: () => {},
};

const AppContext = createContext(INIT);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvasReady, setCanvasReady] = useState<boolean>(INIT.canvasReady);
  const [orbitMode, setOrbitMode] = useState<boolean>(INIT.orbitMode);
  const [selectedCelestialBody, setSelectedCelestialBody] =
    useState<CelestialBody>(INIT.selectedCelestialBody);
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    INIT.selectedProperties,
  );

  return (
    <AppContext.Provider
      value={{
        canvasReady,
        orbitMode,
        selectedCelestialBody,
        selectedProperties,

        setCanvasReady,
        setOrbitMode,
        setSelectedCelestialBody,
        setSelectedProperties,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
