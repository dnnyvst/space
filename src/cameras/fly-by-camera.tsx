import { useThree, useFrame } from "@react-three/fiber";

export const FlyByCamera = () => {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(1, 1, -0.5);
  });

  return null;
};
