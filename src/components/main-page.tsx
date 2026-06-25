"use client";

import { useEffect } from "react";
import { MainCanvas } from "@/components";
import { AppContextProvider, CameraContextProvider } from "@/hooks";
import { preloadFont } from "troika-three-text";

export const MainPage = () => {
  useEffect(() => {
    preloadFont(
      {
        font: "/fonts/GeistMono-Regular.ttf",
      },
      () => {},
    );
  }, []);

  return (
    <AppContextProvider>
      <CameraContextProvider>
        <MainCanvas />
      </CameraContextProvider>
    </AppContextProvider>
  );
};
