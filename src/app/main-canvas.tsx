"use client";

import { type FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Earth } from "./earth";

export const MainCanvas: FC = () => {
  return (
    <div className="border-1 border-gray-800 rounded-lg w-1/2 h-3/4">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="white" position={[2, 2, 5]} />
        <Earth />
      </Canvas>
    </div>
  );
};
