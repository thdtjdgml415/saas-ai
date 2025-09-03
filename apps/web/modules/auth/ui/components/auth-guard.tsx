"use client";
import React from "react";
import { Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import SignInView from "../views/sign-in-view";
import { AuthLayout } from "../layouts/auth-layout";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthLoading>
        <div className="min-w-screen min-h-screen h-full flex flex-col flex-1 items-center justify-center ">
          <div>loading.....</div>
        </div>
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
