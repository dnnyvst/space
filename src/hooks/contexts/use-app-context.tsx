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
  hoveredMoonId: string | null;

  setSelectedCelestialBodyId: (id: string) => void;
  setSelectedProperties: Dispatch<SetStateAction<Set<string>>>;
  setHoveredMoonId: Dispatch<SetStateAction<string | null>>;
}

const INIT: AppContextValue = {
  selectedCelestialBodyId: "earth",
  selectedProperties: new Set(["clouds", "atmosphere"]),
  hoveredMoonId: null,

  setSelectedCelestialBodyId: () => {},
  setSelectedProperties: () => {},
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
  const [hoveredMoonId, setHoveredMoonId] = useState<string | null>(
    INIT.hoveredMoonId,
  );

  return (
    <AppContext.Provider
      value={{
        selectedCelestialBodyId,
        selectedProperties,
        hoveredMoonId,

        setSelectedCelestialBodyId,
        setSelectedProperties,
        setHoveredMoonId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
