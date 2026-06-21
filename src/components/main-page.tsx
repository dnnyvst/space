"use client";

import { MainCanvas } from "@/components";
import { AppContextProvider } from "@/hooks";

export const MainPage = () => (
  <AppContextProvider>
    <MainCanvas />
  </AppContextProvider>
);
