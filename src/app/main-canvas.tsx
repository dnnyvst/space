"use client";

import { type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth, SunLight } from "@/components";

export const MainCanvas: FC = () => (
  <div className="w-1/2 h-3/4">
    <Canvas>
      <ambientLight intensity={0.1} />
      <SunLight />
      <Earth />
    </Canvas>
  </div>
);
