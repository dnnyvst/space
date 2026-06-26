import { useEffect, useRef, type FC } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { useCameraContext } from "@/hooks";

interface FollowCameraProps {
  enabled?: boolean;
}

const target = new THREE.Vector3();
const upOffset = new THREE.Vector3(0, 0.25, 0);
const offset = new THREE.Vector3();
const direction = new THREE.Vector3();
const newCameraPosition = new THREE.Vector3();

export const FollowCamera: FC<FollowCameraProps> = ({ enabled = false }) => {
  const { camera, scene } = useThree();

  const { followName } = useCameraContext();

  const followRef = useRef<THREE.Object3D | null | undefined>(null);

  useEffect(() => {
    followRef.current = followName ? scene.getObjectByName(followName) : null;
  }, [followName, scene]);

  useFrame((_, delta) => {
    if (!enabled || !followRef?.current) return;

    followRef.current.getWorldPosition(target);

    // todo - use parent center via
    // target.clone().sub(planet.position).normalize()
    direction.copy(target).normalize();

    // copy direction
    // multiply (x "farther" from parent)
    // add vertical lift
    offset
      .copy(direction)
      .multiplyScalar(followName === "moon" ? 1 : 0.5)
      .add(upOffset);

    newCameraPosition.copy(target).add(offset);

    camera.position.set(
      THREE.MathUtils.damp(camera.position.x, newCameraPosition.x, 3, delta),
      THREE.MathUtils.damp(camera.position.y, newCameraPosition.y, 3, delta),
      THREE.MathUtils.damp(camera.position.z, newCameraPosition.z, 3, delta),
    );

    // camera.lookAt(target);
    const lookAtMatrix = new THREE.Matrix4();
    const targetQuat = new THREE.Quaternion();

    lookAtMatrix.lookAt(camera.position, target, camera.up);
    targetQuat.setFromRotationMatrix(lookAtMatrix);

    camera.quaternion.slerp(targetQuat, 1 - Math.exp(-6 * delta));
  });

  return null;
};
