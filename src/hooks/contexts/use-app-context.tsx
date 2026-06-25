import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface AppContextValue {
  selectedCelestialBodyId: string;
  selectedProperties: Set<string>;
  showOrbitPaths: boolean;
  hoveredMoonId: string | null;

  setSelectedCelestialBodyId: (id: string) => void;
  setSelectedProperties: Dispatch<SetStateAction<Set<string>>>;
  setShowOrbitPaths: Dispatch<SetStateAction<boolean>>;
  setHoveredMoonId: Dispatch<SetStateAction<string | null>>;
}

const INIT: AppContextValue = {
  selectedCelestialBodyId: "earth",
  selectedProperties: new Set(["clouds", "atmosphere"]),
  hoveredMoonId: null,
  showOrbitPaths: false,

  setSelectedCelestialBodyId: () => {},
  setSelectedProperties: () => {},
  setShowOrbitPaths: () => {},
  setHoveredMoonId: () => {},
};

const AppContext = createContext(INIT);

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCelestialBodyId, setSelectedCelestialBodyId] =
    useState<string>(INIT.selectedCelestialBodyId);
  const [selectedProperties, setSelectedProperties] = useState<Set<string>>(
    INIT.selectedProperties,
  );
  const [showOrbitPaths, setShowOrbitPaths] = useState<boolean>(
    INIT.showOrbitPaths,
  );
  const [hoveredMoonId, setHoveredMoonId] = useState<string | null>(
    INIT.hoveredMoonId,
  );

  return (
    <AppContext.Provider
      value={{
        selectedCelestialBodyId,
        selectedProperties,
        showOrbitPaths,
        hoveredMoonId,

        setSelectedCelestialBodyId,
        setSelectedProperties,
        setShowOrbitPaths,
        setHoveredMoonId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
