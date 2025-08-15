"use client";
import React from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import SignInView from "../views/sign-in-view";
import { AuthLayout } from "../layouts/auth-layout";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <p>loading.....</p>
      </AuthLoading>
      <Authenticated>{children}</Authenticated>
      <Unauthenticated>
        <AuthLayout>
          <SignInView />
        </AuthLayout>
      </Unauthenticated>
    </>
  );
};
