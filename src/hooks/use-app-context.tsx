import { PLANET_CONFIG, type PlanetConfig } from "@/config";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface AppContextValue {
  canvasReady: boolean;
  orbitMode: boolean;
  selectedPlanet: PlanetConfig;
  selectedProperties: Set<string>;

  setCanvasReady: Dispatch<SetStateAction<boolean>>;
  setOrbitMode: Dispatch<SetStateAction<boolean>>;
  setSelectedPlanet: (planetConfig: PlanetConfig) => void;
  setSelectedProperties: Dispatch<SetStateAction<Set<string>>>;
}

const INIT: AppContextValue = {
  canvasReady: false,
  orbitMode: false,
  selectedPlanet: PLANET_CONFIG["earth"],
  selectedProperties: new Set(["clouds", "atmosphere"]),

  setCanvasReady: () => {},
  setOrbitMode: () => {},
  setSelectedPlanet: () => {},
  setSelectedProperties: () => {},
};

const AppContext = createContext(INIT);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvasReady, setCanvasReady] = useState<boolean>(INIT.canvasReady);
  const [orbitMode, setOrbitMode] = useState<boolean>(INIT.orbitMode);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetConfig>(
    INIT.selectedPlanet,
  );
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    INIT.selectedProperties,
  );

  return (
    <AppContext.Provider
      value={{
        canvasReady,
        orbitMode,
        selectedPlanet,
        selectedProperties,

        setCanvasReady,
        setOrbitMode,
        setSelectedPlanet,
        setSelectedProperties,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
