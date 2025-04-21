"use client";

import type { PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import NoAddress from "./characters/NoAddress";

export default function WithForceConnect({ children }: PropsWithChildren) {
  const { isConnected } = useAccount();
  if (isConnected) return <>{children}</>;
  return (
    <NoAddress
      title="NOTHING TO SEE HERE"
      description="You must connect your wallet to get started!"
    />
  );
}
