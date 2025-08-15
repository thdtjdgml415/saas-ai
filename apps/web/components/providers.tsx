"use client";

import { useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import * as React from "react";

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error("Missing NEXT_PUBLIC_CONVEX_URL in your .env file");
}
// Ensure that the Convex client is created only once
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");
/**
 * Wraps React children with Convex + Clerk providers so Convex hooks use Clerk authentication.
 *
 * The component supplies the module-scoped Convex client and Clerk's `useAuth` hook to
 * `ConvexProviderWithClerk`, enabling Convex queries/mutations to run with the current
 * Clerk-authenticated session.
 *
 * @param children - React nodes to render inside the Convex/Clerk provider context
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
