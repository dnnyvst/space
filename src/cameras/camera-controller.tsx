import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { FollowCamera, HandheldCamera, OrbitCamera } from "@/cameras";
import { useCameraContext } from "@/hooks";

export const MIN_FOV = 75;
export const MAX_FOV = 90;

export const CameraController = () => {
  const { activeCamera, fov, followName, setFollowName } = useCameraContext();

  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);

  // remove follow id when camera changes
  useEffect(() => {
    if (!followName) return;

    if (activeCamera !== "follow") {
      setFollowName(null);
    }
  }, [activeCamera, followName, setFollowName]);

  // fov smoothing
  useFrame((_, delta) => {
    if (!cameraRef.current) return;

    const clamped = THREE.MathUtils.clamp(fov, MIN_FOV, MAX_FOV);

    // skip update if already basically there
    if (Math.abs(cameraRef.current.fov - clamped) < 0.01) return;

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
      <HandheldCamera enabled={activeCamera === "handheld"} />
      <OrbitCamera enabled={activeCamera === "orbit"} />
      <FollowCamera enabled={activeCamera === "follow"} />
    </>
  );
};
