import { type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useCameraContext } from "@/hooks";

interface FollowCameraProps {
  enabled?: boolean;
}

export const FollowCamera: FC<FollowCameraProps> = ({ enabled = false }) => {
  const { camera, scene } = useThree();

  const { followName } = useCameraContext();

  const followObject = scene.getObjectByName(followName ?? "");

  const offset = new THREE.Vector3();
  const direction = new THREE.Vector3();
  const newCameraPosition = new THREE.Vector3();

  useFrame((_, delta) => {
    if (!enabled || !followObject) return;

    const target = new THREE.Vector3();
    followObject.getWorldPosition(target);

    // todo - use parent center via
    // target.clone().sub(planet.position).normalize()
    direction.copy(target).normalize();

    // copy direction
    // multiply (x "farther" from parent)
    // add vertical lift
    offset
      .copy(direction)
      .multiplyScalar(followName === "moon" ? 1 : 0.5)
      .add(new THREE.Vector3(0, 0.25, 0));

    newCameraPosition.copy(target).add(offset);

    camera.position.set(
      THREE.MathUtils.damp(camera.position.x, newCameraPosition.x, 3, delta),
      THREE.MathUtils.damp(camera.position.y, newCameraPosition.y, 3, delta),
      THREE.MathUtils.damp(camera.position.z, newCameraPosition.z, 3, delta),
    );

    camera.lookAt(target);
  });

  return null;
};
