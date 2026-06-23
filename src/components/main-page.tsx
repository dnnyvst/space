"use client";

import { MainCanvas } from "@/components";
import { AppContextProvider, CameraContextProvider } from "@/hooks";

export const MainPage = () => (
  <AppContextProvider>
    <CameraContextProvider>
      <MainCanvas />
    </CameraContextProvider>
  </AppContextProvider>
);
