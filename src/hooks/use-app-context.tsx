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
  selectedPlanetId: string;
  selectedProperties: Set<string>;

  setCanvasReady: Dispatch<SetStateAction<boolean>>;
  setOrbitMode: Dispatch<SetStateAction<boolean>>;
  setSelectedPlanetId: (id: string) => void;
  setSelectedProperties: Dispatch<SetStateAction<Set<string>>>;
}

const INIT: AppContextValue = {
  canvasReady: false,
  orbitMode: false,
  selectedPlanetId: "earth",
  selectedProperties: new Set(["clouds", "atmosphere"]),

  setCanvasReady: () => {},
  setOrbitMode: () => {},
  setSelectedPlanetId: () => {},
  setSelectedProperties: () => {},
};

const AppContext = createContext(INIT);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [canvasReady, setCanvasReady] = useState<boolean>(INIT.canvasReady);
  const [orbitMode, setOrbitMode] = useState<boolean>(INIT.orbitMode);
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>(
    INIT.selectedPlanetId,
  );
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    INIT.selectedProperties,
  );

  return (
    <AppContext.Provider
      value={{
        canvasReady,
        orbitMode,
        selectedPlanetId,
        selectedProperties,

        setCanvasReady,
        setOrbitMode,
        setSelectedPlanetId,
        setSelectedProperties,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
