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
  cameraZoom: number;
  fov: number;

  setOrbitMode: Dispatch<SetStateAction<boolean>>;
  setCameraZoom: (zoom: number) => void;
  setFov: (fov: number) => void;
}

const INIT: CameraContextValue = {
  orbitMode: false,
  cameraZoom: 1,
  fov: 75,

  setOrbitMode: () => {},
  setCameraZoom: () => {},
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
  const [cameraZoom, setCameraZoom] = useState<number>(INIT.cameraZoom);
  const [fov, setFov] = useState<number>(INIT.fov);

  return (
    <CameraContext.Provider
      value={{
        orbitMode,
        cameraZoom,
        fov,

        setOrbitMode,
        setCameraZoom,
        setFov,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
