"use client";

import { type FC } from "react";
import { Canvas } from "@react-three/fiber";
import { Earth, SunLight } from "@/components";

export const MainCanvas: FC = () => (
  <div className="w-full h-full">
    <Canvas>
      <ambientLight intensity={0.1} />
      <SunLight />
      <Earth />
    </Canvas>
  </div>
);
