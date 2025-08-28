"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ConvexReactClient, ConvexProvider } from "convex/react";
import { Provider } from "jotai";
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "");
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // convex와 연동해주는 프로바이더
    <ConvexProvider client={convex}>
      <Provider>{children}</Provider>
    </ConvexProvider>
  );
}
