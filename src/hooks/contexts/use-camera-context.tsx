import { Moon } from "@/types";
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";

type Camera = "handheld" | "orbit" | "follow";

interface CameraContextValue {
  activeCamera: Camera;
  handheldZoom: number;
  fov: number;
  followName: Moon | null;

  setActiveCamera: Dispatch<SetStateAction<Camera>>;
  setHandheldZoom: Dispatch<SetStateAction<number>>;
  setFov: Dispatch<SetStateAction<number>>;
  setFollowName: Dispatch<SetStateAction<Moon | null>>;
}

const INIT: CameraContextValue = {
  activeCamera: "handheld",
  handheldZoom: 1,
  fov: 75,
  followName: null,

  setActiveCamera: () => {},
  setHandheldZoom: () => {},
  setFov: () => {},
  setFollowName: () => {},
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
  const [followName, setFollowName] = useState<Moon | null>(INIT.followName);

  return (
    <CameraContext.Provider
      value={{
        activeCamera,
        handheldZoom,
        fov,
        followName,

        setActiveCamera,
        setHandheldZoom,
        setFov,
        setFollowName,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
