import { useFrame } from "@react-three/fiber";
import { sceneTime } from "@/utils";

export const SceneTimeDriver = () => {
  useFrame((_, delta) => {
    sceneTime.add(delta);
  });

  return null;
};
