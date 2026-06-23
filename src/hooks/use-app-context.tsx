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
  selectedCelestialBodyId: string;
  selectedProperties: Set<string>;

  setCanvasReady: Dispatch<SetStateAction<boolean>>;
  setOrbitMode: Dispatch<SetStateAction<boolean>>;
  setSelectedCelestialBodyId: (id: string) => void;
  setSelectedProperties: Dispatch<SetStateAction<Set<string>>>;

  cameraZoom: number;
  setCameraZoom: (zoom: number) => void;
}

const INIT: AppContextValue = {
  canvasReady: false,
  orbitMode: false,
  selectedCelestialBodyId: "jupiter",
  selectedProperties: new Set(["clouds", "atmosphere"]),

  setCanvasReady: () => {},
  setOrbitMode: () => {},
  setSelectedCelestialBodyId: () => {},
  setSelectedProperties: () => {},

  cameraZoom: 1,
  setCameraZoom: () => {},
};

const AppContext = createContext(INIT);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvasReady, setCanvasReady] = useState<boolean>(INIT.canvasReady);
  const [orbitMode, setOrbitMode] = useState<boolean>(INIT.orbitMode);
  const [selectedCelestialBodyId, setSelectedCelestialBodyId] =
    useState<string>(INIT.selectedCelestialBodyId);
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    INIT.selectedProperties,
  );

  const [cameraZoom, setCameraZoom] = useState<number>(INIT.cameraZoom);

  return (
    <AppContext.Provider
      value={{
        canvasReady,
        orbitMode,
        selectedCelestialBodyId,
        selectedProperties,

        setCanvasReady,
        setOrbitMode,
        setSelectedCelestialBodyId,
        setSelectedProperties,

        cameraZoom,
        setCameraZoom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
