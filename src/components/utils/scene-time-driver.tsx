import { useFrame } from "@react-three/fiber";
import { sceneTime } from "@/components";

export const SceneTimeDriver = () => {
  useFrame((_, delta) => {
    sceneTime.add(delta);
  });

  return null;
};
