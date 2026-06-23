import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { HandheldCamera, OrbitCamera } from "@/cameras";
import { useAppContext } from "@/hooks";

export const MIN_FOV = 75;
export const MAX_FOV = 90;

export const CameraController = () => {
  const { orbitMode, fov } = useAppContext();

  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  useFrame((_, delta) => {
    const clamped = THREE.MathUtils.clamp(fov, MIN_FOV, MAX_FOV);

    cameraRef.current.fov = THREE.MathUtils.damp(
      cameraRef.current.fov,
      clamped,
      5,
      delta,
    );

    cameraRef.current.updateProjectionMatrix();
  });

  return (
    <>
      <PerspectiveCamera
        makeDefault
        ref={cameraRef}
        near={0.1}
        far={5000}
        fov={MIN_FOV}
      />
      <HandheldCamera enabled={!orbitMode} />
      <OrbitCamera enabled={orbitMode} />
    </>
  );
};
