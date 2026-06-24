import { useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { sceneTime } from "@/utils";
import { useCameraContext } from "@/hooks";

// // Orbit settings
// const RADIUS = 5;
// const ORBIT_SPEED = 0.12;

// // Very slow vertical drift
// const VERTICAL_AMPLITUDE = 0.15; // keep this small
// const VERTICAL_SPEED = 0.25; // VERY slow (≈30s per cycle) (EDITED, was 0.03)

// const Y_AXIS = new THREE.Vector3(0, 1, 0);

interface FollowCameraProps {
  enabled?: boolean;
}

export const FollowCamera: FC<FollowCameraProps> = ({ enabled = false }) => {
  const { camera } = useThree();

  const { followRef } = useCameraContext();

  const newCameraPosition = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!enabled || !followRef?.current) return;

    // const time = sceneTime.get();

    const targetPosition = followRef.current.position;

    newCameraPosition.current.set(
      targetPosition.x,
      targetPosition.y + 1,
      targetPosition.z + 1,
    );

    // camera.position.copy(newCameraPosition.current);
    camera.lookAt(followRef.current.position);
  });

  return null;
};
