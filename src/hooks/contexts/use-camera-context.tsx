import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type Camera = "handheld" | "orbit";

interface CameraContextValue {
  activeCamera: Camera;
  handheldZoom: number;
  fov: number;

  setActiveCamera: Dispatch<SetStateAction<Camera>>;
  setHandheldZoom: Dispatch<SetStateAction<number>>;
  setFov: Dispatch<SetStateAction<number>>;
}

const INIT: CameraContextValue = {
  activeCamera: "handheld",
  handheldZoom: 1,
  fov: 75,

  setActiveCamera: () => {},
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
  const [activeCamera, setActiveCamera] = useState<Camera>(INIT.activeCamera);
  const [handheldZoom, setHandheldZoom] = useState<number>(INIT.handheldZoom);
  const [fov, setFov] = useState<number>(INIT.fov);

  return (
    <CameraContext.Provider
      value={{
        activeCamera,
        handheldZoom,
        fov,

        setActiveCamera,
        setHandheldZoom,
        setFov,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
