import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export const SpinningSphere = () => {
  const myMesh = useRef(null);

  useFrame(({ clock }) => {
    if (myMesh.current) {
      myMesh.current.rotation.y = clock.elapsedTime / 4;
      myMesh.current.rotation.z = clock.elapsedTime / 8;
    }
  });

  return (
    <mesh ref={myMesh}>
      <sphereGeometry args={[2, 32, 16]} />
      <meshStandardMaterial color="white" wireframe />
    </mesh>
  );
};
