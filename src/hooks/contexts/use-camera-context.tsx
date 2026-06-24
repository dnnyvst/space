import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
  RefObject,
  useRef,
} from "react";
import * as THREE from "three";

type Camera = "handheld" | "orbit" | "follow";

interface CameraContextValue {
  activeCamera: Camera;
  handheldZoom: number;
  fov: number;
  followRef: RefObject<THREE.Mesh | null> | null;

  setActiveCamera: Dispatch<SetStateAction<Camera>>;
  setHandheldZoom: Dispatch<SetStateAction<number>>;
  setFov: Dispatch<SetStateAction<number>>;
}

const INIT: CameraContextValue = {
  activeCamera: "handheld",
  handheldZoom: 1,
  fov: 75,
  followRef: null,

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

  const followRef = useRef(null);

  // const stopFollowing = () => {
  //   setActiveCamera("handheld");
  //   followRef.current = null;
  // };

  return (
    <CameraContext.Provider
      value={{
        activeCamera,
        handheldZoom,
        fov,
        followRef,

        setActiveCamera,
        setHandheldZoom,
        setFov,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
};
