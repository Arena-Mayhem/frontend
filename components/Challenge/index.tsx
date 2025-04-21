"use client";

import History from "@/components/Challenge/History";
import ActiveChallenges from "./ActiveChallenges";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";

import NoAddress from "../Character/NoAddress";

export default function SectionChallenge() {
  const { isConnected } = useAccount();
  const pathname = usePathname();
  const isHistory = pathname === "/challenge/history";

  return !isConnected ? (
    <NoAddress
      title="NOTHING TO SEE HERE"
      description="Please connect before you continue"
    />
  ) : isHistory ? (
    <History />
  ) : (
    <ActiveChallenges />
  );
}
