"use client";

import { api } from "@workspace/backend/_generated/api";
import { useQuery } from "convex/react";

export default function Page() {
  const users = useQuery(api.users.getMany);
  console.log(users);
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <p className="text-2xl font-bold">Hello widget</p>
      <div className="max-w-sm w-full mx-auto">
        {JSON.stringify(users, null, 2)}
      </div>
    </div>
  );
}
