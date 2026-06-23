import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

interface CameraContextValue {
  orbitMode: boolean;
  handheldZoom: number;
  fov: number;

  setOrbitMode: Dispatch<SetStateAction<boolean>>;
  setHandheldZoom: (zoom: number) => void;
  setFov: (fov: number) => void;
}

const INIT: CameraContextValue = {
  orbitMode: false,
  handheldZoom: 1,
  fov: 75,

  setOrbitMode: () => {},
  setHandheldZoom: () => {},
  setFov: () => {},
};

const CameraContext = createContext(INIT);

export const useCameraContext = () => useContext(CameraContext);

export const CameraContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [orbitMode, setOrbitMode] = useState<boolean>(INIT.orbitMode);
  const [handheldZoom, setHandheldZoom] = useState<number>(INIT.handheldZoom);
  const [fov, setFov] = useState<number>(INIT.fov);

  return (
    <CameraContext.Provider
      value={{
        orbitMode,
        handheldZoom,
        fov,

        setOrbitMode,
        setHandheldZoom,
        setFov,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
