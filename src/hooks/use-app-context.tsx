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
}

const INIT: AppContextValue = {
  canvasReady: false,
  orbitMode: false,
  selectedCelestialBodyId: "earth",
  selectedProperties: new Set(["clouds", "atmosphere"]),

  setCanvasReady: () => {},
  setOrbitMode: () => {},
  setSelectedCelestialBodyId: () => {},
  setSelectedProperties: () => {},
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
